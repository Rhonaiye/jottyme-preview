import { useRef, useEffect, useState } from 'react';

interface AnnotationCanvasProps {
  isDrawing: boolean;
  tool: string;
  color: string;
  brushSize: number;
  onAddPin: (x: number, y: number) => void;
}

interface DrawingPath {
  tool: string;
  color: string;
  size: number;
  points: { x: number; y: number }[];
}

export function AnnotationCanvas({ 
  isDrawing, 
  tool, 
  color, 
  brushSize,
  onAddPin 
}: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawingPath, setIsDrawingPath] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawingPath | null>(null);
  const [paths, setPaths] = useState<DrawingPath[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redrawCanvas();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paths.forEach(path => {
      if (path.points.length < 2) return;

      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);
      
      for (let i = 1; i < path.points.length; i++) {
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      
      ctx.stroke();
    });

    // Draw current path
    if (currentPath && currentPath.points.length > 1) {
      ctx.strokeStyle = currentPath.color;
      ctx.lineWidth = currentPath.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(currentPath.points[0].x, currentPath.points[0].y);
      
      for (let i = 1; i < currentPath.points.length; i++) {
        ctx.lineTo(currentPath.points[i].x, currentPath.points[i].y);
      }
      
      ctx.stroke();
    }
  };

  useEffect(() => {
    redrawCanvas();
  }, [paths, currentPath]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);

    if (tool === 'pen') {
      setIsDrawingPath(true);
      setCurrentPath({
        tool,
        color,
        size: brushSize,
        points: [pos],
      });
    } else if (tool === 'cursor') {
      // Add annotation pin
      onAddPin(pos.x, pos.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawingPath || !currentPath) return;

    const pos = getMousePos(e);
    setCurrentPath(prev => prev ? {
      ...prev,
      points: [...prev.points, pos],
    } : null);
  };

  const handleMouseUp = () => {
    if (isDrawingPath && currentPath) {
      setPaths(prev => [...prev, currentPath]);
      setCurrentPath(null);
      setIsDrawingPath(false);
    }
  };

  const getCursorStyle = () => {
    if (!isDrawing) return 'default';
    
    switch (tool) {
      case 'pen':
        return 'crosshair';
      case 'cursor':
        return 'cursor-map-pin';
      default:
        return 'crosshair';
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-${isDrawing ? 'auto' : 'none'} z-10`}
      style={{ cursor: getCursorStyle() }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}