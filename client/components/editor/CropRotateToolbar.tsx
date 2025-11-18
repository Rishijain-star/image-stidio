import { Canvas } from 'fabric';
import { Button } from '@/components/ui/button';
import { RotateCw, Crop } from 'lucide-react';

interface CropRotateToolbarProps {
  canvas: Canvas | null;
  onRotate: (angle: number) => void;
}

export const CropRotateToolbar = ({ canvas, onRotate }: CropRotateToolbarProps) => {
  const handleRotate90 = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject() as any;
      if (activeObject) {
        const currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle + 90);
        canvas.renderAll();
        onRotate(90);
      }
    }
  };

  const handleRotateLeft = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject() as any;
      if (activeObject) {
        const currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle - 15);
        canvas.renderAll();
        onRotate(-15);
      }
    }
  };

  const handleRotateRight = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject() as any;
      if (activeObject) {
        const currentAngle = activeObject.angle || 0;
        activeObject.rotate(currentAngle + 15);
        canvas.renderAll();
        onRotate(15);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center bg-white rounded-lg shadow-md p-3 border border-gray-200">
      <span className="text-sm font-medium text-gray-700">Transform:</span>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRotateLeft}
        title="Rotate -15°"
      >
        <RotateCw className="w-4 h-4 transform -scale-x-100" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRotate90}
        title="Rotate 90°"
      >
        <RotateCw className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRotateRight}
        title="Rotate +15°"
      >
        <RotateCw className="w-4 h-4" />
      </Button>
    </div>
  );
};
