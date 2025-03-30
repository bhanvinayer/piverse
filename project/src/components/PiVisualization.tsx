import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PiVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas2DRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });

    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create a spiral of points using π
    const piDigits = "3.14159265358979323846";
    const points = [];
    for (let i = 0; i < piDigits.length; i++) {
      const digit = parseInt(piDigits[i]);
      if (isNaN(digit)) continue;
      
      const theta = i * 0.5;
      const r = (i + 1) * 0.3;
      points.push(
        new THREE.Vector3(
          r * Math.cos(theta),
          digit * 0.2,
          r * Math.sin(theta)
        )
      );
    }

    // Create the visualization
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.2,
    });
    const pointCloud = new THREE.Points(geometry, material);
    sceneRef.current.add(pointCloud);

    // Position camera
    cameraRef.current.position.z = 10;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      requestAnimationFrame(animate);
      pointCloud.rotation.y += 0.002;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvas2DRef.current) return;
    const canvas = canvas2DRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const piDigits = "3.14159265358979323846";
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 20;

    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw circular visualization
    for (let i = 0; i < piDigits.length; i++) {
      const digit = parseInt(piDigits[i]);
      if (isNaN(digit)) continue;

      const angle = (i / piDigits.length) * Math.PI * 2;
      const radius = maxRadius * ((digit + 1) / 10);
      
      // Draw radius line
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      
      const hue = (digit * 36) % 360;
      ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw digit
      ctx.fillStyle = 'white';
      ctx.font = '14px monospace';
      const textX = centerX + (radius + 20) * Math.cos(angle);
      const textY = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(piDigits[i], textX - 4, textY + 4);
    }

    // Draw connecting lines
    ctx.beginPath();
    for (let i = 0; i < piDigits.length; i++) {
      const digit = parseInt(piDigits[i]);
      if (isNaN(digit)) continue;

      const angle = (i / piDigits.length) * Math.PI * 2;
      const radius = maxRadius * ((digit + 1) / 10);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.closePath();
    ctx.stroke();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">π Visualization</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">3D Visualization</h3>
          <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden" />
          <p className="mt-2 text-gray-300 text-sm">
            A 3D spiral representation of π's digits, where height and position are determined by each digit's value.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">2D Visualization</h3>
          <canvas
            ref={canvas2DRef}
            width={600}
            height={600}
            className="w-full h-auto bg-black rounded-lg"
          />
          <p className="mt-2 text-gray-300 text-sm">
            Circular visualization where each digit of π determines the length and color of radial lines, creating a unique pattern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PiVisualization;