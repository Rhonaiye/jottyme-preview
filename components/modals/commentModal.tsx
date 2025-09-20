import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Reply, Check, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface Comment {
  id: string;
  x: number;
  y: number;
  author: string;
  content: string;
  timestamp: Date;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  likes?: number;
}

interface CommentModalProps {
  comment: Comment;
  isOpen: boolean;
  onClose: () => void;
  onResolve?: (commentId: string) => void;
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, replyText: string) => void;
}

export function CommentModal({ comment, isOpen, onClose, onResolve, onLike, onReply }: CommentModalProps) {
  const [showReplyField, setShowReplyField] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  // Check if mobile screen - simplified approach
  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours === 1) {
      return '1 hour ago';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply?.(comment.id, replyText);
      setReplyText('');
      setShowReplyField(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(comment.id);
  };

  const handleResolve = () => {
    onResolve?.(comment.id);
    onClose();
  };

  const priorityConfig = {
    low: { color: '#05df72', bgColor: 'rgba(5,223,114,0.1)', borderColor: 'rgba(5,223,114,0.2)' },
    medium: { color: '#fdc700', bgColor: 'rgba(240,177,0,0.1)', borderColor: 'rgba(240,177,0,0.2)' },
    high: { color: '#fb2c36', bgColor: 'rgba(251,44,54,0.1)', borderColor: 'rgba(251,44,54,0.2)' },
  };

  const currentPriority = comment.priority || 'medium';
  const priority = priorityConfig[currentPriority];

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
          
          {/* Modal */}
          <motion.div
            className={`
              fixed z-[60] bg-card border border-border rounded-[14px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
              ${isMobileScreen
                ? 'w-[calc(100vw-32px)] max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' 
                : 'w-96 max-w-[calc(100vw-32px)] md:max-w-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
              }
            `}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full border-2 border-[rgba(106,73,252,0.2)] overflow-hidden flex-shrink-0">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}&backgroundColor=a78bfa`}
                      alt={`${comment.author}'s avatar`}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground font-medium text-[14px] leading-[20px] truncate">
                      {comment.author}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-[12px] leading-[16px]">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{formatTimeAgo(comment.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {/* Priority Badge */}
              <div className="mb-4">
                <span 
                  className="rounded-[8px] px-[9px] py-[3px] text-[12px] font-medium leading-[16px]"
                  style={{
                    backgroundColor: priority.bgColor,
                    color: priority.color,
                    border: `1px solid ${priority.borderColor}`
                  }}
                >
                  {currentPriority} priority
                </span>
              </div>

              {/* Tags */}
              {comment.tags && comment.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {comment.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-transparent border border-border rounded-[8px] px-[9px] py-[3px] text-muted-foreground text-[12px] font-medium leading-[16px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Comment Text */}
              <div className="text-foreground text-[14px] leading-[22.75px] mb-4 whitespace-pre-wrap break-words">
                {comment.content}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-border pt-[9px] gap-3 sm:gap-0">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-[8px] hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} 
                    />
                    <span className="text-muted-foreground text-[12px] font-medium leading-[16px]">
                      {(comment.likes || 3) + (isLiked ? 1 : 0)}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowReplyField(!showReplyField)}
                    className="flex items-center gap-1.5 h-7 px-2.5 rounded-[8px] hover:bg-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Reply className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-[12px] font-medium leading-[16px]">
                      Reply
                    </span>
                  </motion.button>
                </div>
                
                <motion.button
                  onClick={handleResolve}
                  className="flex items-center gap-1.5 h-7 px-2.5 rounded-[8px] hover:bg-[rgba(5,223,114,0.1)] transition-colors justify-center sm:justify-start"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="w-4 h-4 text-[#05df72]" />
                  <span className="text-[#05df72] text-[12px] font-medium leading-[16px]">
                    Resolve
                  </span>
                </motion.button>
              </div>

              {/* Reply Field */}
              <AnimatePresence>
                {showReplyField && (
                  <motion.div
                    className="border-t border-border pt-[13px] mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="bg-input border-border min-h-[60px] h-[60px] resize-none text-[14px] text-foreground placeholder:text-muted-foreground mb-3"
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={handleReply}
                        disabled={!replyText.trim()}
                        className="bg-[#6a49fc] hover:bg-[#5a3bec] text-white font-medium h-8 px-2.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 justify-center"
                      >
                        <Reply className="w-4 h-4" />
                        Reply
                      </Button>
                      
                      <Button
                        onClick={() => {
                          setShowReplyField(false);
                          setReplyText('');
                        }}
                        variant="outline"
                        className="bg-card border-border text-foreground hover:bg-accent font-medium h-8 px-[13px] justify-center"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}