import React, { useEffect, useRef, useState } from 'react';
import { Download, Plus, Minus, RotateCcw, Circle, Target } from 'lucide-react';

interface Shape {
  type: 'circle' | 'concentric' | 'spiral';
  x: number;
  y: number;
  radius: number;
  segments?: number;
  color: string;
  rotation?: number;
}

const GenerativeArt: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const customCanvasRef = useRef<HTMLCanvasElement>(null);
  const [generating, setGenerating] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [segments, setSegments] = useState(8);
  const [radius, setRadius] = useState(100);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentTool, setCurrentTool] = useState<'circle' | 'concentric' | 'spiral'>('circle');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const generateArt = () => {
      setGenerating(true);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const piDigits = "3.14159265358979323846";
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < piDigits.length; i++) {
        const digit = parseInt(piDigits[i]);
        if (isNaN(digit)) continue;

        const hue = (digit * 36) % 360;
        ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.lineWidth = 2;

        const radius = (i + 1) * 20;
        const segments = digit + 3;
        
        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
      
      setGenerating(false);
    };

    generateArt();
  }, []);

  useEffect(() => {
    if (!customCanvasRef.current) return;
    const canvas = customCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all shapes
    shapes.forEach(shape => {
      if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (shape.type === 'concentric') {
        const rings = 5;
        for (let i = 1; i <= rings; i++) {
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, (shape.radius * i) / rings, 0, Math.PI * 2);
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else if (shape.type === 'spiral') {
        ctx.beginPath();
        const turns = 3;
        for (let i = 0; i <= 360 * turns; i++) {
          const angle = (i * Math.PI) / 180;
          const radius = (shape.radius * i) / (360 * turns);
          const x = shape.x + radius * Math.cos(angle + (shape.rotation || 0));
          const y = shape.y + radius * Math.sin(angle + (shape.rotation || 0));
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Draw guide for current tool
    if (isDrawing) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [shapes, isDrawing, radius, segments]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = customCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newShape: Shape = {
      type: currentTool,
      x,
      y,
      radius,
      segments: segments,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      rotation: Math.random() * Math.PI * 2
    };
    
    setShapes([...shapes, newShape]);
  };

  const handleDownload = () => {
    const canvas = customMode ? customCanvasRef.current : canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'pi-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const clearCanvas = () => {
    setShapes([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">π Generative Art</h2>
      <div className="space-y-8">
        <div className="flex gap-4">
          <button
            onClick={() => setCustomMode(false)}
            className={`px-4 py-2 rounded-md transition-colors ${
              !customMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Automatic Generation
          </button>
          <button
            onClick={() => setCustomMode(true)}
            className={`px-4 py-2 rounded-md transition-colors ${
              customMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Create Your Own
          </button>
        </div>

        <div className="relative">
          {!customMode ? (
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-auto bg-black rounded-lg"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentTool('circle')}
                    className={`p-2 rounded-md transition-colors ${
                      currentTool === 'circle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                    title="Single Circle"
                  >
                    <Circle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentTool('concentric')}
                    className={`p-2 rounded-md transition-colors ${
                      currentTool === 'concentric' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                    title="Concentric Circles"
                  >
                    <Target className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentTool('spiral')}
                    className={`p-2 rounded-md transition-colors ${
                      currentTool === 'spiral' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                    }`}
                    title="Spiral"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12" />
                    </svg>
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Size: {radius}px
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRadius(r => Math.max(10, r - 10))}
                      className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setRadius(r => r + 10)}
                      className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={clearCanvas}
                  className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                  title="Clear Canvas"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <canvas
                ref={customCanvasRef}
                width={800}
                height={600}
                className="w-full h-auto bg-black rounded-lg cursor-crosshair"
                onClick={handleCanvasClick}
                onMouseEnter={() => setIsDrawing(true)}
                onMouseLeave={() => setIsDrawing(false)}
              />
            </div>
          )}
          <button
            onClick={handleDownload}
            disabled={generating}
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
      <p className="mt-4 text-gray-300">
        {customMode 
          ? "Create your own π-inspired art! Choose from different circular patterns and combine them to create unique compositions."
          : "This unique artwork is generated using the digits of π, where each number influences the pattern's shape, color, and complexity."}
      </p>
    </div>
  );
};

export default GenerativeArt;