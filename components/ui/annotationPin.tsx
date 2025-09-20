import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface AnnotationPinProps {
  id: string;
  x: number;
  y: number;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function AnnotationPin({ id, x, y, color, onClick, isActive }: AnnotationPinProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Pin Shadow */}
      <div
        className="absolute inset-0 rounded-full shadow-2xl"
        style={{
          backgroundColor: color,
          width: '28px',
          height: '28px',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(4px)',
          opacity: 0.3,
        }}
      />
      
      {/* Pin Body */}
      <div
        className="relative w-7 h-7 rounded-full border-2 border-white shadow-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ backgroundColor: color }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-0.5 rounded-full opacity-20"
          style={{ backgroundColor: 'white' }}
        />
        
        {/* Icon */}
        <MessageSquare className="h-3 w-3 text-white relative z-10" />
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#1a1b23] text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap border border-[rgba(54,65,83,0.5)]"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          Click to view comment
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-[#1a1b23]" />
        </motion.div>
      )}
    </motion.div>
  );
}