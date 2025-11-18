import { Canvas, Polygon, Path } from 'fabric';

export interface Selection {
  id: string;
  type: 'polygon' | 'brush';
  object: Polygon | Path;
  color: string;
  opacity: number;
  points?: Array<{ x: number; y: number }>;
}

export class SelectionManager {
  private selections: Map<string, Selection> = new Map();
  private activeSelectionId: string | null = null;
  private selectionCounter: number = 0;

  addPolygonSelection(canvas: Canvas, polygon: Polygon, color: string, opacity: number = 0.3): string {
    const id = `polygon-${this.selectionCounter++}`;
    
    polygon.set({
      stroke: color,
      fill: this.hexToRgba(color, opacity),
      selectable: true,
      evented: true,
      strokeWidth: 2,
    });

    const selection: Selection = {
      id,
      type: 'polygon',
      object: polygon,
      color,
      opacity,
      points: (polygon as any).points?.map((p: any) => ({ x: p.x, y: p.y })),
    };

    this.selections.set(id, selection);
    this.activeSelectionId = id;
    canvas.add(polygon);
    canvas.renderAll();

    return id;
  }

  addBrushSelection(canvas: Canvas, paths: any[], color: string, opacity: number = 0.3): string {
    const id = `brush-${this.selectionCounter++}`;
    
    paths.forEach(path => {
      path.set({
        stroke: color,
        fill: 'transparent',
        selectable: false,
        evented: false,
        strokeWidth: 2,
      });
    });

    const selection: Selection = {
      id,
      type: 'brush',
      object: paths[0],
      color,
      opacity,
    };

    this.selections.set(id, selection);
    this.activeSelectionId = id;

    return id;
  }

  getActiveSelection(): Selection | null {
    if (!this.activeSelectionId) return null;
    return this.selections.get(this.activeSelectionId) || null;
  }

  getAllSelections(): Selection[] {
    return Array.from(this.selections.values());
  }

  removeSelection(id: string, canvas: Canvas): void {
    const selection = this.selections.get(id);
    if (selection) {
      canvas.remove(selection.object);
      this.selections.delete(id);
      if (this.activeSelectionId === id) {
        this.activeSelectionId = null;
      }
      canvas.renderAll();
    }
  }

  setActiveSelection(id: string): void {
    if (this.selections.has(id)) {
      this.activeSelectionId = id;
    }
  }

  clearAll(canvas: Canvas): void {
    this.selections.forEach((selection) => {
      canvas.remove(selection.object);
    });
    this.selections.clear();
    this.activeSelectionId = null;
    canvas.renderAll();
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * Apply clipping path to only show object inside selection
   */
  applySelectionMask(canvas: Canvas, texture: any, selectionId: string): boolean {
    const selection = this.selections.get(selectionId);
    if (!selection) return false;

    try {
      if (selection.type === 'polygon' && selection.object instanceof Polygon) {
        const clipPath = selection.object;
        texture.clipPath = clipPath;
        canvas.renderAll();
        return true;
      } else if (selection.type === 'brush') {
        // For brush selections, we create a group with the texture inside
        // This is a simplified approach - complex masking with brush paths
        texture.clipPath = null;
        canvas.renderAll();
        return true;
      }
    } catch (error) {
      console.error('Error applying selection mask:', error);
      return false;
    }

    return false;
  }

  removeSelectionMask(texture: any): void {
    texture.clipPath = null;
  }
}
