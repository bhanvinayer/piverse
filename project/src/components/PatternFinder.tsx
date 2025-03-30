import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCw, Download } from 'lucide-react';

const PatternFinder: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [speed, setSpeed] = useState(1);
  const [radius, setRadius] = useState(200);
  const [segments, setSegments] = useState(20);
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showDigits, setShowDigits] = useState(true);
  const [showLines, setShowLines] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const piDigits = "3.14159265358979323846";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Animation frame for rotation
    let animationFrame: number;
    const animate = () => {
      if (autoRotate) {
        setRotation(r => (r + 0.001 * speed) % (Math.PI * 2));
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw spiral
    ctx.beginPath();
    for (let i = 0; i < piDigits.length * segments; i++) {
      const t = i / segments;
      const digit = parseInt(piDigits[Math.floor(t)]);
      if (isNaN(digit)) continue;

      const angle = t * Math.PI * 0.5 + rotation;
      const r = (radius * t) / piDigits.length;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw digits at segment points
      if (showDigits && i % segments === 0) {
        const digitX = centerX + (r + 20) * Math.cos(angle);
        const digitY = centerY + (r + 20) * Math.sin(angle);
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '16px monospace';
        ctx.fillText(piDigits[Math.floor(t)], digitX - 5, digitY + 5);
        ctx.restore();
      }
    }
    ctx.strokeStyle = `hsl(${rotation * 30}, 70%, 50%)`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw connecting lines
    if (showLines) {
      ctx.beginPath();
      for (let i = 0; i < piDigits.length; i++) {
        const digit = parseInt(piDigits[i]);
        if (isNaN(digit)) continue;

        const angle = (i / piDigits.length) * Math.PI * 2 + rotation;
        const r = radius * ((digit + 1) / 10);
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [radius, segments, rotation, autoRotate, speed, showDigits, showLines]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'pi-visualization.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">π Visualization</h2>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Radius: {radius}px
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRadius(r => Math.max(50, r - 10))}
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Detail: {segments}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSegments(s => Math.max(5, s - 5))}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSegments(s => s + 5)}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Speed: {speed}x
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSpeed(s => Math.max(0.1, s - 0.1))}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSpeed(s => s + 0.1)}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-md transition-colors ${
                autoRotate ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDigits(!showDigits)}
              className={`p-2 rounded-md transition-colors ${
                showDigits ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              123
            </button>
            <button
              onClick={() => setShowLines(!showLines)}
              className={`p-2 rounded-md transition-colors ${
                showLines ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              ⚡
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-auto bg-black rounded-lg"
        />
      </div>
      <p className="mt-4 text-gray-300">
        An interactive visualization of π as a spiral pattern. Adjust the radius, detail level, and animation speed to explore different aspects of the pattern. Toggle digits and connecting lines for different views.
      </p>
    </div>
  );
};

export default PatternFinder;