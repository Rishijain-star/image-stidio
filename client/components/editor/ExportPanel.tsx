import { Canvas } from 'fabric';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState } from 'react';

interface ExportPanelProps {
  canvas: Canvas | null;
  watermarkText?: string;
}

export const ExportPanel = ({ canvas, watermarkText = 'Texture Studio' }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!canvas) return;

    setIsExporting(true);
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 2,
      });

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `texture-edit-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJPEG = async () => {
    if (!canvas) return;

    setIsExporting(true);
    try {
      const dataURL = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.95,
        multiplier: 2,
      });

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `texture-edit-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Export</h3>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-800 font-medium mb-2">Studio Watermark:</p>
        <p className="text-2xl font-bold text-blue-600">{watermarkText}</p>
      </div>

      <p className="text-xs text-gray-600 mb-4">
        Your image will be exported with full resolution. The studio watermark will be displayed on the final output.
      </p>

      <div className="space-y-3">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export as PNG'}
        </Button>
        
        <Button
          onClick={handleExportJPEG}
          disabled={isExporting}
          variant="outline"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export as JPEG'}
        </Button>
      </div>

      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p>• Full-resolution export (2x quality)</p>
        <p>• Studio watermark included</p>
        <p>• Preserves all edits</p>
      </div>
    </div>
  );
};
