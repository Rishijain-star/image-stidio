import { useEffect, useState } from 'react';
import { Canvas, PencilBrush } from 'fabric';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check } from 'lucide-react';

interface BrushSelectionToolProps {
  canvas: Canvas | null;
  onComplete: (color: string) => void;
  onCancel: () => void;
  brushSize?: number;
  onBrushSizeChange?: (size: number) => void;
}

export const BrushSelectionTool = ({
  canvas,
  onComplete,
  onCancel,
  brushSize = 20,
  onBrushSizeChange
}: BrushSelectionToolProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<any[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [color, setColor] = useState<string>('#FFA500');

  useEffect(() => {
    if (!canvas) return;

    try {
      // Enable drawing mode first
      canvas.isDrawingMode = true;

      // Initialize brush if it doesn't exist
      if (!canvas.freeDrawingBrush || !canvas.freeDrawingBrush.color) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }

      // Set brush properties with selected color
      if (canvas.freeDrawingBrush) {
        const rgbaColor = `${color}80`; // Add alpha for semi-transparency
        canvas.freeDrawingBrush.color = rgbaColor;
        canvas.freeDrawingBrush.width = brushSize;
      }

      setInitialized(true);

      const handlePathCreated = (event: any) => {
        setPaths(prev => [...prev, event.path]);
      };

      canvas.on('path:created', handlePathCreated);
      canvas.on('mouse:down', () => setIsDrawing(true));
      canvas.on('mouse:up', () => setIsDrawing(false));

      return () => {
        try {
          canvas.off('path:created', handlePathCreated);
          canvas.off('mouse:down');
          canvas.off('mouse:up');
          canvas.isDrawingMode = false;
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    } catch (error) {
      console.error('Error setting up brush:', error);
      setInitialized(false);
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas && canvas.freeDrawingBrush && initialized) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas, initialized]);

  const handleClear = () => {
    if (canvas) {
      try {
        const paths = canvas.getObjects('path');
        paths.forEach(path => canvas.remove(path));
        canvas.renderAll();
        setPaths([]);
      } catch (error) {
        console.error('Error clearing paths:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex gap-4 items-center z-50">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            if (canvas && canvas.freeDrawingBrush) {
              const rgbaColor = `${e.target.value}80`;
              canvas.freeDrawingBrush.color = rgbaColor;
            }
          }}
          className="w-10 h-10 rounded cursor-pointer border border-gray-300"
        />
      </div>

      <div className="w-px h-8 bg-gray-300" />

      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Brush Size:</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => onBrushSizeChange?.(parseInt(e.target.value))}
          className="w-24"
        />
        <span className="text-sm text-gray-600">{brushSize}px</span>
      </div>

      <div className="w-px h-8 bg-gray-300" />

      <Button
        size="sm"
        variant="outline"
        onClick={handleClear}
        disabled={paths.length === 0}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button
        size="sm"
        onClick={() => onComplete(color)}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        <Check className="w-4 h-4 mr-2" />
        Done
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};
