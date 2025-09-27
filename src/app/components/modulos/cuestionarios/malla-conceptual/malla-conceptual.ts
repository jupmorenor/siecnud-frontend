import { Component, AfterViewInit, ElementRef, ViewChild, signal, output } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { Canvas, Group, Line, Circle, Textbox, Triangle, TPointerEventInfo, InteractiveFabricObject } from 'fabric';

interface Link {
  line: Group;
  from: Group;
  to: Group;
}

@Component({
  selector: 'app-malla-conceptual',
  imports: [
    MatMenuModule,
    MatListModule
  ],
  templateUrl: './malla-conceptual.html',
  styleUrls: ['./malla-conceptual.css'],
})
export class MallaConceptual implements AfterViewInit {
  
  @ViewChild('malla', { static: true }) fabricCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  conceptos = output<any[]>();
  
  private canvas!: Canvas;
  protected selectedGroup: Group | null = null;
  protected contextMenuPosition = signal({ x: 0, y: 0, objX: 0, objY: 0 });

  private groups: Group[] = [];
  private links: Link[] = [];
  
  private isLinking = false;
  private linkStart: Group | null = null;

  ngAfterViewInit(): void {

    InteractiveFabricObject.ownDefaults = {
      ...InteractiveFabricObject.ownDefaults,
      hasControls: false,
    }

    this.canvas = new Canvas(this.fabricCanvas.nativeElement, {
      width: 950,
      height: 675,
      selection: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      stopContextMenu: true,
    });

    this.canvas.on('contextmenu', (event: any) => {
      const mouseEvent = event.e as MouseEvent;
      mouseEvent.preventDefault();
      if (mouseEvent.button === 2) { // Click derecho
        this.contextMenuPosition.set({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
          objX: mouseEvent.layerX,
          objY: mouseEvent.layerY
        });
        this.selectedGroup = this.canvas.findTarget(mouseEvent) as Group;
        this.contextMenuTrigger.openMenu();
      }
    });

    this.canvas.on('mouse:up', (event: TPointerEventInfo) => {
      event.e.preventDefault();
      if (this.isLinking && this.linkStart) {
        const target = event.target as Group;
        if (target !== this.linkStart) {
          this.linkGroups(this.linkStart, target);
        } else {
          this.canvas.discardActiveObject(event.e);
        }
        this.isLinking = false;
        this.linkStart = null;
        this.canvas.defaultCursor = 'default';
      }
    });

  }

  crearGrupo() {
    this.contextMenuTrigger.closeMenu();
    const group = this.crearConcepto();
    this.groups.push(group);
    this.entregarConceptos();
  }

  eliminarGrupo() {
    this.contextMenuTrigger.closeMenu();
    this.groups = this.groups.filter(g => g !== this.selectedGroup);
    this.links = this.links.filter(link => {
      if (link.from === this.selectedGroup || link.to === this.selectedGroup) {
        this.canvas.remove(link.line);
        return false;
      }
      return true;
    });
    this.canvas.remove(this.selectedGroup!);
    this.selectedGroup = null;
    this.entregarConceptos();
  }

  agregarEnlace() {
    this.contextMenuTrigger.closeMenu();
    this.isLinking = true;
    this.linkStart = this.selectedGroup;
    this.canvas.defaultCursor = 'pointer';
  }

  private crearConcepto(): Group {
    const circle = new Circle({
      radius: 60,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center',
    });

    const text = new Textbox('Nuevo concepto', {
      fontSize: 18,
      fill: 'black',
      originX: 'center',
      originY: 'center',
      fontFamily: 'Roboto',
      textAlign: 'center',
    });

    const group = new Group([circle, text], {
      left: this.contextMenuPosition().objX,
      top: this.contextMenuPosition().objY,
      originX: 'center',
      originY: 'center',
      hasControls: false,
    });

    group.on('mousedblclick', () => {
      const editarTexto = new Textbox(text.text || '', {
        left: group.left,
        top: group.top,
        fontSize: text.fontSize,
        fontFamily: text.fontFamily,
        textAlign: text.textAlign,
        originX: 'center',
        originY: 'center',
        hasControls: false,
      });

      text.set({visible: false});
      this.canvas.add(editarTexto);
      this.canvas.setActiveObject(editarTexto);
      editarTexto.enterEditing();
      editarTexto.selectAll();

      editarTexto.on('editing:exited', () => {
        if (editarTexto.text !== text.text) {
          text.set({
            text: editarTexto.text,
            visible: true,
          })
        }
        this.canvas.remove(editarTexto);
        this.entregarConceptos();
      });
    });

    this.canvas.add(group);
    this.canvas.setActiveObject(group);
    this.canvas.requestRenderAll();

    group.on('moving', () => this.updateLinks(group));
    //group.on('modified', () => this.updateLinks(group));

    return group;
  }

  private linkGroups(from: Group, to: Group) {

    const angle = this.pointDirection(from.left!, from.top!, to.left!, to.top!);

    const offsetX = this.lengthDirX(60, angle);
    const offsetY = this.lengthDirY(60, angle);

    const linea = new Line([
      from.left + offsetX,
      from.top + offsetY,
      to.left - offsetX,
      to.top - offsetY
    ], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    const arrow = new Triangle({
      left: to.left - offsetX,
      top: to.top - offsetY,
      originX: 'center',
      originY: 'center',
      angle: angle + 90,
      width: 12,
      height: 12,
      fill: 'black',
      selectable: false,
      evented: false,
    });

    const line = new Group([linea, arrow], {
      selectable: false,
      hasControls: false,
      evented: false,
    });

    this.canvas.add(line);
    this.links.push({ line, from, to });

    this.canvas.requestRenderAll();
  }

  private updateLinks(movedGroup: Group) {
    movedGroup.left = Math.min(Math.max(movedGroup.left, 0), this.canvas.getWidth());
    movedGroup.top = Math.min(Math.max(movedGroup.top, 0), this.canvas.getHeight());

    this.links.forEach((link: Link, i: number, links: Link[]) => {
      
      if (link.from === movedGroup || link.to === movedGroup) {
        const from = link.from;
        const to = link.to;

        const angle = this.pointDirection(from.left, from.top, to.left, to.top);
        const offsetX = this.lengthDirX(60, angle);
        const offsetY = this.lengthDirY(60, angle);

        this.canvas.remove(link.line);

        const newLine = new Line([
          from.left + offsetX,
          from.top + offsetY,
          to.left - offsetX,
          to.top - offsetY
        ], {
          stroke: 'black',
          strokeWidth: 2,
          selectable: false,
          evented: false,
        });

        const newArrow = new Triangle({
          left: to.left - offsetX,
          top: to.top - offsetY,
          originX: 'center',
          originY: 'center',
          angle: angle + 90,
          width: 12,
          height: 12,
          fill: 'black',
          selectable: false,
          evented: false,
        });

        const newlink = new Group([newLine, newArrow], {
          selectable: true,
          hasControls: false,
          evented: false,
        });

        this.canvas.add(newlink);
        links[i] = { line: newlink, from, to };
        
        this.canvas.requestRenderAll();
      }
    });

  }

  private pointDirection(x1: number, y1: number, x2: number, y2: number): number {
    return 180 * (Math.atan2(y2 - y1, x2 - x1)) / Math.PI;
  }

  private lengthDirX(len: number, angle: number): number {
    return len * Math.cos(angle * (Math.PI / 180));
  }

  private lengthDirY(len: number, angle: number): number {
    return len * Math.sin(angle * (Math.PI / 180));
  }

  private entregarConceptos() {
    const conceptos: any[] = [];
    this.groups.forEach((g, i) => {
      const textObj = g._objects.find(o => o instanceof Textbox) as Textbox;
      if (textObj && textObj.text) {
        conceptos.push({id: i, nombre: textObj.text});
      }
    });
    this.conceptos.emit(conceptos);
  }
}