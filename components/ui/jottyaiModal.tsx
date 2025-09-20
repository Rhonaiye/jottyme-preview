import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { X, Send } from 'lucide-react';
import { toast } from 'sonner';

interface JottyAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JottyAIModal({ isOpen, onClose }: JottyAIModalProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSummarizeFeedback = () => {
    toast.success('Feedback summarized successfully');
  };

  const handleCreateActionItems = () => {
    toast.success('Action items created');
  };

  const handleExportReport = () => {
    toast.success('Report exported successfully');
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      toast.info(`Message sent: ${inputValue}`);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay Background */}
      <motion.div
        className="fixed inset-0 bg-black/60 dark:bg-black/60 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className="fixed bottom-[80px] right-4 sm:bottom-[120px] sm:right-6 z-50 w-[calc(100vw-32px)] max-w-[400px] h-[calc(100vh-160px)] max-h-[600px]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-card border border-border rounded-[20px] w-full h-full shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col transition-colors duration-300">
          {/* Header */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-foreground text-[16px] sm:text-[18px] leading-[24px] font-medium">JottyAI</h3>
                <p className="text-muted-foreground text-[12px] sm:text-[14px] leading-[18px]">Your feedback assistant</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Welcome Message */}
            <div className="bg-muted/50 rounded-[16px] p-4 sm:p-5">
              <p className="text-foreground text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]">
                Hi! I'm JottyAI, your feedback assistant. I can help you analyze comments, create action items, and streamline your design process.
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-[11px] leading-[14px] mt-2">
                Just now
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-foreground text-[14px] sm:text-[15px] leading-[20px] font-medium">
                Quick actions:
              </h4>
              
              <div className="space-y-2">
                <button
                  onClick={handleSummarizeFeedback}
                  className="w-full bg-muted hover:bg-muted/80 rounded-[12px] p-3 sm:p-4 text-left transition-colors duration-200 group"
                >
                  <span className="text-foreground text-[13px] sm:text-[14px] leading-[18px] font-medium group-hover:text-[#6a49fc] transition-colors">
                    Summarize feedback
                  </span>
                </button>

                <button
                  onClick={handleCreateActionItems}
                  className="w-full bg-muted hover:bg-muted/80 rounded-[12px] p-3 sm:p-4 text-left transition-colors duration-200 group"
                >
                  <span className="text-foreground text-[13px] sm:text-[14px] leading-[18px] font-medium group-hover:text-[#6a49fc] transition-colors">
                    Create action items
                  </span>
                </button>

                <button
                  onClick={handleExportReport}
                  className="w-full bg-muted hover:bg-muted/80 rounded-[12px] p-3 sm:p-4 text-left transition-colors duration-200 group"
                >
                  <span className="text-foreground text-[13px] sm:text-[14px] leading-[18px] font-medium group-hover:text-[#6a49fc] transition-colors">
                    Export report
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-border">
            <div className="flex gap-2">
              <div className="flex-1 bg-input-background rounded-[12px] border border-border px-3 py-2">
                <input
                  type="text"
                  placeholder="Ask me anything about your project..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-transparent text-foreground text-[12px] sm:text-[13px] placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button 
                onClick={handleSendMessage}
                className="bg-[#6a49fc] hover:bg-[#5a3efc] rounded-[12px] px-3 py-2 transition-colors"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
            <p className="text-muted-foreground text-[9px] sm:text-[10px] leading-[12px] mt-2 text-center">
              JottyAI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}