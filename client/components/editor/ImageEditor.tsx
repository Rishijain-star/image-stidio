import { useEffect, useRef, useState } from 'react';
import { Canvas, Image as FabricImage, Polygon } from 'fabric';
import { Button } from '@/components/ui/button';
import { Upload, Wand2, Paintbrush, Trash2, RotateCcw, Save } from 'lucide-react';
import { PolygonSelectionTool } from './PolygonSelectionTool';
import { BrushSelectionTool } from './BrushSelectionTool';
import { TexturePanel } from './TexturePanel';
import { ExportPanel } from './ExportPanel';
import { CropRotateToolbar } from './CropRotateToolbar';
import { CanvasHistoryManager } from '@/lib/canvasUtils';
import { SelectionManager } from '@/lib/selectionManager';

export const ImageEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [historyManager] = useState(() => new CanvasHistoryManager());
  const [selectionManager] = useState(() => new SelectionManager());
  const [mode, setMode] = useState<'view' | 'polygon' | 'brush'>('view');
  const [brushSize, setBrushSize] = useState(20);
  const [hasImage, setHasImage] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 1000,
      height: 700,
      backgroundColor: '#f5f5f5',
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    const updateHistory = () => {
      historyManager.push(canvas);
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    };

    canvas.on('object:added', updateHistory);
    canvas.on('object:modified', updateHistory);
    canvas.on('object:removed', updateHistory);

    return () => {
      canvas.off('object:added', updateHistory);
      canvas.off('object:modified', updateHistory);
      canvas.off('object:removed', updateHistory);
    };
  }, [canvas, historyManager]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        canvas.clear();

        const fabricImg = new FabricImage(img);
        const maxWidth = 900;
        const maxHeight = 600;
        
        let scale = 1;
        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleX = maxWidth / img.width;
          const scaleY = maxHeight / img.height;
          scale = Math.min(scaleX, scaleY);
        }

        fabricImg.scale(scale);
        canvas.add(fabricImg);
        canvas.setActiveObject(fabricImg);
        canvas.centerObject(fabricImg);
        canvas.renderAll();
        
        setHasImage(true);
        historyManager.push(canvas);
        setCanUndo(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUndo = () => {
    if (canvas && historyManager.canUndo()) {
      historyManager.undo(canvas);
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    }
  };

  const handleRedo = () => {
    if (canvas && historyManager.canRedo()) {
      historyManager.redo(canvas);
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    }
  };

  const handleClear = () => {
    if (canvas) {
      canvas.clear();
      selectionManager.clearAll(canvas);
      setHasImage(false);
      setHasSelection(false);
      historyManager.clear();
      setCanUndo(false);
      setCanRedo(false);
    }
  };

  const handlePolygonComplete = (polygon: Polygon, color: string) => {
    setMode('view');
    selectionManager.addPolygonSelection(canvas!, polygon, color, 0.2);
    setHasSelection(true);
    historyManager.push(canvas!);
    setCanUndo(historyManager.canUndo());
  };

  const handleBrushComplete = (color: string) => {
    setMode('view');
    if (canvas) {
      canvas.isDrawingMode = false;
      const brushPaths = canvas.getObjects('path') as any[];
      if (brushPaths.length > 0) {
        selectionManager.addBrushSelection(canvas, brushPaths, color, 0.2);
        setHasSelection(true);
      }
    }
    historyManager.push(canvas!);
    setCanUndo(historyManager.canUndo());
  };

  const handleTextureApplied = () => {
    historyManager.push(canvas!);
    setCanUndo(historyManager.canUndo());
  };

  const handleRotate = () => {
    historyManager.push(canvas!);
    setCanUndo(historyManager.canUndo());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-blue-400" />
            Texture Studio
          </h1>
          <p className="text-gray-400">Professional texture editing and application tool</p>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </span>
              </Button>
            </label>
          </div>

          <Button
            onClick={() => setMode(mode === 'polygon' ? 'view' : 'polygon')}
            variant={mode === 'polygon' ? 'default' : 'outline'}
            disabled={!hasImage}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Polygon Select
          </Button>

          <Button
            onClick={() => setMode(mode === 'brush' ? 'view' : 'brush')}
            variant={mode === 'brush' ? 'default' : 'outline'}
            disabled={!hasImage}
          >
            <Paintbrush className="w-4 h-4 mr-2" />
            Brush Select
          </Button>

          <div className="h-10 w-px bg-gray-600" />

          <Button
            onClick={handleUndo}
            variant="outline"
            disabled={!canUndo}
          >
            <RotateCcw className="w-4 h-4 mr-2 transform -scale-x-100" />
            Undo
          </Button>

          <Button
            onClick={handleRedo}
            variant="outline"
            disabled={!canRedo}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Redo
          </Button>

          <Button
            onClick={handleClear}
            variant="destructive"
            disabled={!hasImage}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Main Editor Layout */}
        <div className="flex gap-6">
          {/* Canvas */}
          <div className="flex-1">
            <div 
              ref={containerRef}
              className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200"
            >
              <canvas
                ref={canvasRef}
                className="block mx-auto"
              />
            </div>
            
            {hasImage && (
              <div className="mt-4">
                <CropRotateToolbar canvas={canvas} onRotate={handleRotate} />
              </div>
            )}

            {!hasImage && (
              <div className="mt-8 text-center text-gray-400">
                <Upload className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">No image loaded</p>
                <p className="text-sm">Upload an image to get started with texture editing</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-96 space-y-6">
            {hasImage && (
            <>
              <TexturePanel
                canvas={canvas}
                onTextureApplied={handleTextureApplied}
                selectionManager={selectionManager}
              />
              <ExportPanel canvas={canvas} watermarkText="Texture Studio" />
            </>
          )}
          </div>
        </div>

        {/* Selection Tools Overlays */}
        {mode === 'polygon' && canvas && (
          <PolygonSelectionTool
            canvas={canvas}
            onComplete={handlePolygonComplete}
            onCancel={() => setMode('view')}
          />
        )}

        {mode === 'brush' && canvas && (
          <BrushSelectionTool
            canvas={canvas}
            onComplete={handleBrushComplete}
            onCancel={() => setMode('view')}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
          />
        )}
      </div>
    </div>
  );
};
