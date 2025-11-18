import { Canvas, Image as FabricImage, Polygon, Point, Rect } from 'fabric';

export interface CanvasHistory {
  state: string;
  timestamp: number;
}

export class CanvasHistoryManager {
  private history: CanvasHistory[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50;

  push(canvas: Canvas) {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push({
      state: JSON.stringify(canvas.toJSON()),
      timestamp: Date.now(),
    });
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  undo(canvas: Canvas): boolean {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const state = this.history[this.currentIndex].state;
      this.loadState(canvas, state);
      return true;
    }
    return false;
  }

  redo(canvas: Canvas): boolean {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const state = this.history[this.currentIndex].state;
      this.loadState(canvas, state);
      return true;
    }
    return false;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  private loadState(canvas: Canvas, state: string) {
    canvas.loadFromJSON(state, () => {
      canvas.renderAll();
    });
  }

  clear() {
    this.history = [];
    this.currentIndex = -1;
  }
}

export const loadImageToCanvas = async (
  canvas: Canvas,
  imageUrl: string | File
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let url: string;

    const processImage = (imageUrl: string) => {
      FabricImage.fromURL(imageUrl, {
        crossOrigin: 'anonymous'
      }).then((img) => {
        canvas.clear();
        const maxWidth = 1000;
        const maxHeight = 800;
        let scale = 1;

        if (img.width! > maxWidth || img.height! > maxHeight) {
          const scaleX = maxWidth / img.width!;
          const scaleY = maxHeight / img.height!;
          scale = Math.min(scaleX, scaleY);
        }

        img.scale(scale);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.centerObject(img);
        canvas.renderAll();
        resolve();
      }).catch(reject);
    };

    if (imageUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        url = e.target?.result as string;
        processImage(url);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageUrl);
    } else {
      processImage(imageUrl);
    }
  });
};

export const createPolygonSelection = (points: Point[]): Polygon => {
  return new Polygon(points.map((p) => ({ x: p.x, y: p.y })), {
    fill: 'rgba(255, 165, 0, 0.2)',
    stroke: '#FFA500',
    strokeWidth: 2,
    selectable: true,
    evented: true,
  });
};

export const canvasToImage = (canvas: Canvas, mimeType: string = 'image/png'): string => {
  return canvas.toDataURL({
    format: mimeType.split('/')[1] as 'png' | 'jpeg' | 'webp',
    quality: 1,
    multiplier: 2,
  });
};

export const rotateCanvas = (canvas: Canvas, angle: number) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.rotate((activeObject.angle || 0) + angle);
    canvas.renderAll();
  }
};

export const cropCanvas = (canvas: Canvas, left: number, top: number, width: number, height: number) => {
  const clippingPath = new Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    absolutePositioned: true,
  });

  canvas.clipPath = clippingPath;
  canvas.renderAll();
};
