import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface AddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (content: string) => void;
  position?: { x: number; y: number };
}

interface SuggestedMessage {
  emoji: string;
  label: string;
  content: string;
}

const suggestedMessages: SuggestedMessage[] = [
  { emoji: '👍', label: 'Approve', content: '👍 Looks great!' },
  { emoji: '💡', label: 'Idea', content: '💡 Here\'s an idea...' },
  { emoji: '❓', label: 'Question', content: '❓ I have a question...' },
];

export function AddCommentModal({ isOpen, onClose, onSubmit, position }: AddCommentModalProps) {
  const [content, setContent] = useState('');
  const maxLength = 500;

  const handleSuggestedMessageClick = (message: SuggestedMessage) => {
    setContent(message.content);
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit?.(content.trim());
      setContent('');
      onClose();
    }
  };

  const handleCancel = () => {
    setContent('');
    onClose();
  };

  const isAddButtonEnabled = content.trim().length > 0;

  // Check if mobile screen - simplified approach
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal - ALWAYS centered on mobile, positioned on desktop */}
          <motion.div
            className={`
              fixed z-[60] bg-card border border-border rounded-[14px]
              ${isMobileScreen 
                ? 'w-[calc(100vw-32px)] max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' 
                : 'w-[448px] max-w-[calc(100vw-32px)]'
              }
            `}
            style={!isMobileScreen && position ? {
              left: `${Math.min(Math.max(position.x + 10, 20), window.innerWidth - 468)}px`,
              top: `${Math.min(Math.max(position.y + 10, 20), window.innerHeight - 420)}px`,
            } : isMobileScreen ? {} : {
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Position indicator - desktop only */}
            {position && !isMobileScreen && (
              <div 
                className="fixed w-6 h-6 bg-[#6a49fc] border-2 border-white rounded-full shadow-lg flex items-center justify-center z-40"
                style={{
                  left: `${position.x - 12}px`,
                  top: `${position.y - 12}px`,
                  pointerEvents: 'none'
                }}
              >
                <MapPin className="w-3 h-3 text-white" />
              </div>
            )}

            {/* Header */}
            <div className="h-[69px] border-b border-border px-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#6a49fc] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-foreground font-semibold text-[16px] leading-[24px]">
                    Add Comment
                  </h2>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="h-8 px-2.5 py-2 hover:bg-accent rounded-[8px] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* User info and textarea */}
              <div className="flex gap-3 items-start mb-3">
                <div className="w-8 h-8 rounded-full border-2 border-[rgba(106,73,252,0.2)] overflow-hidden flex-shrink-0">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=You&backgroundColor=a78bfa"
                    alt="Your avatar"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-foreground font-medium text-[14px] leading-[20px] mb-2">
                    You
                  </div>
                  <Textarea
                    placeholder="Share your feedback..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={maxLength}
                    className="bg-input border-border min-h-20 h-20 resize-none text-[14px] text-foreground placeholder:text-muted-foreground rounded-[8px] px-[13px] py-[9px]"
                  />
                </div>
              </div>

              {/* Suggested messages */}
              <div className="flex flex-wrap gap-2 items-center justify-start mb-4">
                {suggestedMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedMessageClick(message)}
                    className="bg-input border border-border rounded-[8px] px-[9px] py-[5px] hover:bg-accent transition-colors"
                  >
                    <span className="text-muted-foreground font-medium text-[12px] leading-[16px]">
                      {message.emoji} {message.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-start mb-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!isAddButtonEnabled}
                  className={`bg-[#6a49fc] hover:bg-[#5a3bec] text-white font-medium h-8 px-2.5 py-0 flex items-center gap-1.5 rounded-[8px] justify-center ${
                    !isAddButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span className="text-[14px] leading-[20px]">Add Comment</span>
                </Button>
                
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  className="text-muted-foreground hover:bg-accent font-medium h-8 px-3 py-0 rounded-[8px] justify-center"
                >
                  <span className="text-[14px] leading-[20px]">Cancel</span>
                </Button>
              </div>

              {/* Character count */}
              <div className="text-right w-full">
                <span className="text-muted-foreground font-normal text-[12px] leading-[16px]">
                  {content.length}/{maxLength}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}