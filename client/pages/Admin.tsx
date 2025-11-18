import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addLocalTexture, deleteLocalTexture, updateLocalTexture } from '@/lib/textureManager';

export default function Admin() {
  const [watermarkText, setWatermarkText] = useState('Texture Studio');
  const [textureName, setTextureName] = useState('');
  const [textureDataUrl, setTextureDataUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const generateId = (): string => {
    return `texture-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleAddTexture = () => {
    if (!textureName || !textureDataUrl) {
      alert('Please fill in all fields');
      return;
    }

    const newTexture = {
      id: generateId(),
      name: textureName,
      url: textureDataUrl,
      previewUrl: textureDataUrl,
      category: 'custom'
    };

    addLocalTexture(newTexture);
    setTextureName('');
    setTextureDataUrl('');
    alert('Texture added successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setTextureDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Manage textures and watermarks</p>
          </div>
          <Link to="/editor">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Back to Editor
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Watermark Settings */}
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Watermark Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watermark Text
                </label>
                <Input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className="w-full"
                />
              </div>

              <div className="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300 text-center">
                <p className="text-4xl font-bold text-gray-400 mb-2">{watermarkText}</p>
                <p className="text-sm text-gray-500">Preview of watermark</p>
              </div>

              <p className="text-xs text-gray-600 mt-4">
                This watermark will appear on all exported images from the texture editor.
              </p>
            </div>
          </div>

          {/* Texture Management */}
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Texture</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texture Name
                </label>
                <Input
                  type="text"
                  value={textureName}
                  onChange={(e) => setTextureName(e.target.value)}
                  placeholder="e.g., Marble, Concrete"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Texture Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="texture-upload"
                  />
                  <label htmlFor="texture-upload" className="cursor-pointer">
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
              </div>

              {textureDataUrl && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <img 
                    src={textureDataUrl} 
                    alt="Texture preview" 
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}

              <Button
                onClick={handleAddTexture}
                disabled={!textureName || !textureDataUrl}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Texture
              </Button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">About Admin Panel</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Upload custom textures for users to apply in the editor</li>
            <li>• Customize the studio watermark that appears on all exports</li>
            <li>• Textures are stored locally and available in the editor</li>
            <li>• For production, connect to Firebase to sync across instances</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
