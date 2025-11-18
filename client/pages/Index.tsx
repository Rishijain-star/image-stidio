import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Upload, Palette, Download, Shield, Zap } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Wand2 className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-bold text-white">Texture Studio</span>
        </div>
        <div className="flex gap-4">
          <Link to="/editor">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Open Editor
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">
              Admin Panel
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Professional Texture Editing
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload images, apply textures with precision using polygon and brush selection tools, and export stunning high-resolution results with your studio watermark.
          </p>
          <Link to="/editor">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-6">
              <Wand2 className="w-5 h-5 mr-2" />
              Start Editing Now
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Upload className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Smart Upload</h3>
            <p className="text-gray-400">Upload images in any format. Supports high-resolution images for professional quality output.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Wand2 className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Advanced Selection</h3>
            <p className="text-gray-400">Use polygon or brush selection tools to precisely define areas where textures will be applied.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Palette className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Texture Library</h3>
            <p className="text-gray-400">Access a curated library of professional textures. Easily upload and manage custom textures.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Zap className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Full Control</h3>
            <p className="text-gray-400">Scale, rotate, and position textures with precision. Crop and rotate images for perfect alignment.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Download className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Export Quality</h3>
            <p className="text-gray-400">Export in PNG or JPEG format with 2x multiplier for full-resolution professional output.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <Shield className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Studio Branding</h3>
            <p className="text-gray-400">Automatically add your studio watermark to all exports. Customize from admin panel.</p>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-12 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Image Editing</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Upload high-resolution images
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Crop and rotate images
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Full undo/redo support
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Selection Tools</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Polygon selection with point editing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Freehand brush selection
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Adjustable brush size
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Texture Application</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Apply textures to selected areas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Scale and rotate textures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Real-time preview
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-3">Admin Management</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Upload custom textures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Customize watermark text
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Manage texture library
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-white font-semibold">React 18</p>
              <p className="text-gray-400 text-sm">Modern UI framework</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-white font-semibold">Fabric.js</p>
              <p className="text-gray-400 text-sm">Canvas manipulation</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-white font-semibold">TypeScript</p>
              <p className="text-gray-400 text-sm">Type safety</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-white font-semibold">Tailwind CSS</p>
              <p className="text-gray-400 text-sm">Styling</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Images?</h2>
            <p className="text-blue-100 mb-8">Start editing with professional texture tools today.</p>
            <Link to="/editor">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-blue-600 text-lg px-8 py-6 font-bold">
                <Wand2 className="w-5 h-5 mr-2" />
                Launch Texture Studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 Texture Studio. Professional texture editing and application tool.</p>
        </div>
      </footer>
    </div>
  );
}
