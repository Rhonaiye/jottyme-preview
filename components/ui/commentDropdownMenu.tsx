import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, Edit3, Check, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CommentDropdownMenuProps {
  onEdit?: () => void;
  onResolve?: () => void;
  onAssign?: () => void;
  onDelete?: () => void;
}

export function CommentDropdownMenu({
  onEdit,
  onResolve,
  onAssign,
  onDelete,
}: CommentDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action?: () => void) => {
    action?.();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
      >
        <MoreVertical className="w-4 h-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 z-50"
            >
              <div className="bg-card min-w-[180px] rounded-[8px] border border-border shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] p-[5px]">
                {/* Edit */}
                <button
                  onClick={() => handleAction(onEdit)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] hover:bg-accent transition-colors"
                >
                  <Edit3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground text-[14px] font-normal whitespace-nowrap">
                    Edit
                  </span>
                </button>

                {/* Mark as resolved */}
                <button
                  onClick={() => handleAction(onResolve)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] hover:bg-accent transition-colors"
                >
                  <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground text-[14px] font-normal whitespace-nowrap">
                    Mark as resolved
                  </span>
                </button>

                {/* Assign to me */}
                <button
                  onClick={() => handleAction(onAssign)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] hover:bg-accent transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-foreground text-[14px] font-normal whitespace-nowrap">
                    Assign to me
                  </span>
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleAction(onDelete)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-[#ff6467] text-[14px] font-normal whitespace-nowrap">
                    Delete
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
