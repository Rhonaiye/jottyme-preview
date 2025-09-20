import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { 
  MousePointer2, 
  Pen, 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Trash2,
  GripVertical,
  MessageSquare,
  RotateCcw,
  Download
} from 'lucide-react';
import React from 'react';

interface AnnotationToolbarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  isVisible: boolean;
}

const tools = [
  { id: 'cursor', icon: MousePointer2, label: 'Select' },
  { id: 'pen', icon: Pen, label: 'Pen' },
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'trash', icon: Trash2, label: 'Delete' },
];

const colors = [
  '#6a49fc', // Primary purple
  '#fb2c36', // Red
  '#f0b100', // Orange
  '#00c950', // Green
  '#ff6b6b', // Light red
  '#4ecdc4', // Teal
  '#45b7d1', // Blue
  '#96ceb4', // Light green
];

const brushSizes = [
  { size: 1, label: 'Small' },
  { size: 2, label: 'Medium' },
  { size: 4, label: 'Large' },
];

export function AnnotationToolbar({ 
  selectedTool, 
  onToolSelect, 
  selectedColor, 
  onColorSelect,
  brushSize,
  onBrushSizeChange,
  isVisible
}: AnnotationToolbarProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === dragRef.current || (e.target as HTMLElement).closest('[data-drag-handle]')) {
      setIsDragging(true);
      startPos.current = position;
      startMousePos.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startMousePos.current.x;
    const deltaY = e.clientY - startMousePos.current.y;
    
    // Calculate new position with light constraints to keep it mostly in view
    const newX = startPos.current.x + deltaX;
    const newY = startPos.current.y + deltaY;
    
    // Light constraints - allow movement but prevent going too far off screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 100; // Allow some overflow
    
    const constrainedX = Math.max(-viewportWidth/2 - margin, Math.min(viewportWidth/2 + margin, newX));
    const constrainedY = Math.max(-viewportHeight/2 - margin, Math.min(viewportHeight/2 + margin, newY));
    
    setPosition({
      x: constrainedX,
      y: constrainedY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
      document.body.style.cursor = 'grabbing';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [isDragging, position]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={dragRef}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[95vw] px-4 sm:px-0 sm:w-auto sm:bottom-16"
      style={{
        x: position.x,
        y: position.y,
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleMouseDown}
      drag={false} // Disable Motion's built-in drag to use custom implementation
    >
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-3 sm:p-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center justify-between mb-3">
            {/* Drag Handle - Mobile */}
            <div 
              data-drag-handle
              className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                isDragging ? 'cursor-grabbing bg-accent/50' : 'cursor-grab hover:bg-accent/30'
              }`}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground" />
            </div>

            {/* Action Buttons - Mobile */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent/30 hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent/30 hover:text-foreground"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tools - Mobile Horizontal Scroll */}
          <div className="mb-3">
            <p className="text-muted-foreground text-xs mb-2 font-medium">Tools</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;
                const isPrimary = tool.id === 'pen';
                
                return (
                  <Button
                    key={tool.id}
                    variant="ghost"
                    size="sm"
                    className={`h-10 w-10 p-0 rounded-xl transition-all flex-shrink-0 ${
                      isSelected 
                        ? isPrimary
                          ? 'bg-[#6a49fc] text-white shadow-lg scale-105'
                          : 'bg-[rgba(106,73,252,0.2)] text-[#6a49fc] scale-105'
                        : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'
                    }`}
                    onClick={() => onToolSelect(tool.id)}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Colors - Mobile */}
          <div className="mb-3">
            <p className="text-muted-foreground text-xs mb-2 font-medium">Colors</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-lg border-2 transition-all flex-shrink-0 ${
                    selectedColor === color 
                      ? 'border-foreground shadow-lg scale-110' 
                      : 'border-border hover:border-foreground/50'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorSelect(color)}
                />
              ))}
            </div>
          </div>

          {/* Brush Sizes - Mobile */}
          <div>
            <p className="text-muted-foreground text-xs mb-2 font-medium">Size</p>
            <div className="flex gap-2">
              {brushSizes.map((brush) => {
                const isSelected = brushSize === brush.size;
                return (
                  <Button
                    key={brush.size}
                    variant="ghost"
                    size="sm"
                    className={`h-10 w-10 p-0 rounded-xl flex-shrink-0 ${
                      isSelected 
                        ? 'bg-[rgba(106,73,252,0.2)] scale-105' 
                        : 'hover:bg-accent/30'
                    }`}
                    onClick={() => onBrushSizeChange(brush.size)}
                  >
                    <div 
                      className={`rounded-full ${
                        isSelected ? 'bg-[#6a49fc]' : 'bg-muted-foreground'
                      }`}
                      style={{ 
                        width: brush.size === 1 ? '4px' : brush.size === 2 ? '6px' : '10px',
                        height: brush.size === 1 ? '4px' : brush.size === 2 ? '6px' : '10px'
                      }}
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center gap-1">
          {/* Drag Handle */}
          <div 
            data-drag-handle
            className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
              isDragging ? 'cursor-grabbing bg-accent/50' : 'cursor-grab hover:bg-accent/30'
            }`}
          >
            <GripVertical className="h-3 w-3 text-muted-foreground" />
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Tools */}
          <div className="flex items-center gap-1">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              const isPrimary = tool.id === 'pen'; // Pen tool is primary in design
              
              return (
                <Button
                  key={tool.id}
                  variant="ghost"
                  size="sm"
                  className={`h-[33.6px] px-[10.5px] rounded-lg transition-all ${
                    isSelected 
                      ? isPrimary
                        ? 'bg-[#6a49fc] text-white shadow-lg'
                        : 'bg-[rgba(106,73,252,0.2)] text-[#6a49fc]'
                      : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'
                  }`}
                  onClick={() => onToolSelect(tool.id)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Color Palette */}
          <div className="flex items-center gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`h-7 w-7 rounded-lg border-2 transition-all ${
                  selectedColor === color 
                    ? 'border-foreground shadow-lg scale-110' 
                    : 'border-border hover:border-foreground/50'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Brush Sizes */}
          <div className="flex items-center gap-[3.5px]">
            {brushSizes.map((brush) => {
              const isSelected = brushSize === brush.size;
              return (
                <Button
                  key={brush.size}
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-8 p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-[rgba(106,73,252,0.2)]' 
                      : 'hover:bg-accent/30'
                  }`}
                  onClick={() => onBrushSizeChange(brush.size)}
                >
                  <div 
                    className={`rounded-full ${
                      isSelected ? 'bg-[#6a49fc]' : 'bg-muted-foreground'
                    }`}
                    style={{ 
                      width: brush.size === 1 ? '4px' : brush.size === 2 ? '6px' : '10px',
                      height: brush.size === 1 ? '4px' : brush.size === 2 ? '6px' : '10px'
                    }}
                  />
                </Button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-muted-foreground hover:bg-accent/30 hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-muted-foreground hover:bg-accent/30 hover:text-foreground"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}