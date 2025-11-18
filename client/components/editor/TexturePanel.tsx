import { useEffect, useState } from 'react';
import { Canvas, Image as FabricImage } from 'fabric';
import { Texture, getAvailableTextures } from '@/lib/textureManager';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';
import { SelectionManager } from '@/lib/selectionManager';

interface TexturePanelProps {
  canvas: Canvas | null;
  onTextureApplied: () => void;
  selectionManager?: SelectionManager;
}

export const TexturePanel = ({ canvas, onTextureApplied, selectionManager }: TexturePanelProps) => {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    const loadTextures = async () => {
      const availableTextures = await getAvailableTextures();
      setTextures(availableTextures);
      setLoading(false);
    };
    loadTextures();
  }, []);

  useEffect(() => {
    if (selectionManager) {
      const activeSelection = selectionManager.getActiveSelection();
      setHasSelection(!!activeSelection);
    }
  }, [selectionManager]);

  const handleApplyTexture = async () => {
    if (!canvas || !selectedTexture) return;

    try {
      const img = await FabricImage.fromURL(selectedTexture.url);

      img.scaleToWidth(200);
      img.set({
        selectable: true,
        evented: true,
      });

      // Apply clipping mask if selection exists
      if (selectionManager && hasSelection) {
        const activeSelection = selectionManager.getActiveSelection();
        if (activeSelection) {
          selectionManager.applySelectionMask(canvas, img, activeSelection.id);
        }
      }

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.centerObject(img);
      canvas.renderAll();
      onTextureApplied();
    } catch (error) {
      console.error('Error applying texture:', error);
    }
  };

  const handleScaleChange = (value: number[]) => {
    const newScale = value[0];
    setScale(newScale);

    if (canvas) {
      const activeObject = canvas.getActiveObject() as any;
      if (activeObject && activeObject.isType?.('image')) {
        activeObject.scale(newScale);
        canvas.renderAll();
      }
    }
  };

  const handleRotationChange = (value: number[]) => {
    const newRotation = value[0];
    setRotation(newRotation);

    if (canvas) {
      const activeObject = canvas.getActiveObject() as any;
      if (activeObject && activeObject.isType?.('image')) {
        activeObject.rotate(newRotation);
        canvas.renderAll();
      }
    }
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Textures</h3>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading textures...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {textures.map((texture) => (
              <button
                key={texture.id}
                onClick={() => setSelectedTexture(texture)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTexture?.id === texture.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img 
                  src={texture.previewUrl} 
                  alt={texture.name}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <p className="text-xs font-medium text-gray-700 truncate">
                  {texture.name}
                </p>
              </button>
            ))}
          </div>

          {selectedTexture && (
            <>
              {hasSelection && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs text-green-700 font-medium">
                    ✓ Selection active - texture will apply to selected area only
                  </p>
                </div>
              )}
              <Button
                onClick={handleApplyTexture}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-6"
              >
                Apply Texture
              </Button>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Scale: {scale.toFixed(2)}x
                  </label>
                  <Slider
                    value={[scale]}
                    onValueChange={handleScaleChange}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Rotation: {rotation}°
                  </label>
                  <Slider
                    value={[rotation]}
                    onValueChange={handleRotationChange}
                    min={0}
                    max={360}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
