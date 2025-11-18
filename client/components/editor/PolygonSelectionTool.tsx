import { useEffect, useRef, useState } from 'react';
import { Canvas, Point, Polygon } from 'fabric';
import { Button } from '@/components/ui/button';
import { Trash2, Check } from 'lucide-react';

interface PolygonSelectionToolProps {
  canvas: Canvas | null;
  onComplete: (polygon: Polygon, color: string) => void;
  onCancel: () => void;
}

export const PolygonSelectionTool = ({
  canvas,
  onComplete,
  onCancel
}: PolygonSelectionToolProps) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [color, setColor] = useState<string>('#FFA500');
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvas) return;

    const handleCanvasClick = (event: any) => {
      const pointer = canvas.getPointer(event.e);
      setPoints(prev => [...prev, new Point(pointer.x, pointer.y)]);
    };

    canvas.on('mouse:down', handleCanvasClick);

    return () => {
      canvas.off('mouse:down', handleCanvasClick);
    };
  }, [canvas]);

  const handleComplete = () => {
    if (points.length >= 3 && canvas) {
      const polygon = new Polygon(
        points.map(p => ({ x: p.x, y: p.y })),
        {
          fill: `${color}33`,
          stroke: color,
          strokeWidth: 2,
          selectable: true,
          evented: true,
        }
      );
      canvas.add(polygon);
      canvas.renderAll();
      onComplete(polygon, color);
    }
  };

  const handleClear = () => {
    setPoints([]);
  };

  const handleCancel = () => {
    setPoints([]);
    onCancel();
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex gap-4 items-center z-50">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border border-gray-300"
        />
      </div>

      <div className="w-px h-8 bg-gray-300" />

      <div className="text-sm text-gray-600 min-w-max">
        Points: {points.length} {points.length >= 3 && '(ready)'}
      </div>

      <Button
        size="sm"
        variant="outline"
        onClick={handleClear}
        disabled={points.length === 0}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button
        size="sm"
        onClick={handleComplete}
        disabled={points.length < 3}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        <Check className="w-4 h-4 mr-2" />
        Complete
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  );
};
