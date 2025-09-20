import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageSquare, Share2, Check, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { CommentDropdownMenu } from './commentDropdownMenu';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  likes: number;
  isLiked: boolean;
  isResolved?: boolean;
  assignee?: {
    name: string;
    avatar: string;
    initials: string;
  };
  replies?: Comment[];
}

interface CommentPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommentPanel({ isOpen, onClose }: CommentPanelProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: '',
        initials: 'SC'
      },
      content: 'The navigation looks great! Just a minor suggestion about the mobile menu spacing.',
      timestamp: '2 hours ago',
      priority: 'medium',
      tags: ['#design', '#navigation'],
      likes: 4,
      isLiked: true,
      replies: [
        {
          id: '1-1',
          author: {
            name: 'Mike Johnson',
            avatar: '',
            initials: 'MJ'
          },
          content: 'I agree! The spacing could be increased by 8px for better touch targets.',
          timestamp: '1 hour ago',
          priority: 'medium',
          tags: [],
          likes: 1,
          isLiked: true
        }
      ]
    },
    {
      id: '2',
      author: {
        name: 'Lisa Wang',
        avatar: '',
        initials: 'LW'
      },
      content: 'Love the hero section design! The CTA button placement is perfect.',
      timestamp: '1 day ago',
      priority: 'low',
      tags: ['#design', '#cta'],
      likes: 5,
      isLiked: false,
      isResolved: true,
      assignee: {
        name: 'Design Team',
        avatar: '',
        initials: 'DT'
      }
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const handleEditComment = (commentId: string) => {
    toast.info('Edit functionality coming soon!');
  };

  const handleResolveComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isResolved: true }
        : comment
    ));
    toast.success('Comment marked as resolved!');
  };

  const handleAssignComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            assignee: {
              name: 'You',
              avatar: '',
              initials: 'SC'
            }
          }
        : comment
    ));
    toast.success('Comment assigned to you!');
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast.success('Comment deleted!');
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-14 border-l border-border/30 pl-4' : ''}`}>
      <div className="bg-card border border-border rounded-[14px] p-[17px]">
        <div className="flex gap-3 items-start">
          <div className="relative">
            <Avatar className="w-8 h-8 border-2 border-[#6a49fc]/20">
              <AvatarFallback className="bg-gradient-to-br from-[#6a49fc] to-[#a78bfa] text-white text-sm font-semibold">
                {comment.author.initials}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-foreground font-medium text-sm">{comment.author.name}</span>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                <span>{comment.timestamp}</span>
              </div>
              <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(comment.priority)}`}>
                {comment.priority}
              </Badge>
              {comment.isResolved && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2 py-0.5 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Resolved
                </Badge>
              )}
            </div>
            
            {comment.isResolved && comment.assignee && (
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <span>→</span>
                <span>{comment.assignee.name}</span>
                <Avatar className="w-4 h-4 border-2 border-[#6a49fc]/20">
                  <AvatarFallback className="bg-gradient-to-br from-[#6a49fc] to-[#a78bfa] text-white text-[10px]">
                    {comment.assignee.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            
            <p className="text-foreground text-sm leading-relaxed mb-3">
              {comment.content}
            </p>
            
            {comment.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {comment.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs text-muted-foreground border-border">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2.5 text-xs text-red-400 hover:bg-red-500/10"
                >
                  <Heart className={`w-4 h-4 mr-1 ${comment.isLiked ? 'fill-red-400' : ''}`} />
                  {comment.likes}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-accent"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-accent"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              
              <CommentDropdownMenu 
                onEdit={() => handleEditComment(comment.id)}
                onResolve={() => handleResolveComment(comment.id)}
                onAssign={() => handleAssignComment(comment.id)}
                onDelete={() => handleDeleteComment(comment.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-0 top-0 h-screen w-[400px] bg-card border-l border-border z-50 flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground font-medium">Comments</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 space-y-6">
            {/* New Comment Input */}
            <div className="bg-card border border-border rounded-[14px] p-[17px]">
              <div className="flex gap-3 items-start">
                <Avatar className="w-8 h-8 border-2 border-[#6a49fc]/20">
                  <AvatarFallback className="bg-gradient-to-br from-[#6a49fc] to-[#a78bfa] text-white text-sm font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-20 bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                  <div className="flex items-center">
                    <Button
                      disabled={!newComment.trim()}
                      className="bg-[#6a49fc] hover:bg-[#6a49fc]/80 text-white opacity-50"
                    >
                      <MessageSquare className="w-4 h-4 mr-1.5" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  <CommentItem comment={comment} />
                  {comment.replies?.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}