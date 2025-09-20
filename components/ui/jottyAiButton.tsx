import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { JottyAIModal } from './jottyaiModal';

export function JottyAIButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Hide pulse after 5 seconds to not be annoying
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
    setShowPulse(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* AI Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute -top-14 right-0 bg-popover text-popover-foreground border border-border px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Ask JottyAI
              </div>
              <div className="absolute -bottom-1 right-6 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring Animation */}
        <AnimatePresence>
          {showPulse && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#6a49fc]"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-[#6a49fc] hover:bg-[#5a3efc] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#6a49fc]/25 transition-all duration-300 group overflow-hidden"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(106, 73, 252, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.5 
          }}
        >
          {/* Background gradient effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#8b6bff] to-[#6a49fc] rounded-full"
            whileHover={{ scale: 1.2, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Bot className="w-6 h-6" />
          </motion.div>

          {/* Sparkle effect on hover */}
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        </motion.button>
      </div>

      {/* AI Modal */}
      <JottyAIModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}