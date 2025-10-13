

import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Link, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;

}

export function NewProjectModal({ isOpen, onClose,  }: NewProjectModalProps) {
  const router = useRouter()


  const handleImportClick = () => {
    onClose();
    router.push('/my-projects/create/import')
  };

  const handleUploadClick = () => {
    onClose();
     router.push('/my-projects/create/upload')
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border text-foreground w-[90%] max-w-sm sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <DialogHeader className="p-4 sm:p-5 pb-3 sm:pb-4">
            <div className="flex items-center justify-between pr-8">
              <DialogTitle className="text-lg sm:text-xl font-medium text-foreground">
                Create New Project
              </DialogTitle>
            </div>
            <p className="text-sm text-foreground/70 mt-2">
              Choose how to start your project
            </p>
          </DialogHeader>

          {/* Content */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            <div className="grid gap-3">
              {/* Import from URL */}
              <motion.div
                className="bg-[rgba(106,73,252,0.1)] border border-[rgba(106,73,252,0.3)] rounded-lg p-3 sm:p-4 cursor-pointer group hover:bg-[rgba(106,73,252,0.15)] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleImportClick}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-[#6a49fc] rounded-lg flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm sm:text-base mb-1">Import from URL</h3>
                    <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
                      Import websites, Figma designs, or prototypes for review and collaboration.
                    </p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-2">
                      <div className="px-1.5 py-0.5 bg-[rgba(106,73,252,0.2)] rounded-md">
                        <span className="text-xs text-[#a78bfa]">Websites</span>
                      </div>
                      <div className="px-1.5 py-0.5 bg-[rgba(106,73,252,0.2)] rounded-md">
                        <span className="text-xs text-[#a78bfa]">Figma</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Upload Files */}
              <motion.div
                className="bg-accent border border-border rounded-lg p-3 sm:p-4 cursor-pointer group hover:border-[rgba(106,73,252,0.5)] hover:bg-[rgba(106,73,252,0.05)] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUploadClick}
              >
                <div className="flex items-start gap-3">
                  <motion.div 
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-[rgba(106,73,252,0.1)] rounded-lg flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b6bff]" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm sm:text-base mb-1">Upload Files</h3>
                    <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
                      Upload PDFs, images, and documents for design reviews and feedback.
                    </p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 mt-2">
                      <div className="px-1.5 py-0.5 bg-foreground/10 rounded-md border border-foreground/20">
                        <span className="text-xs text-foreground/80 font-medium">PDFs</span>
                      </div>
                      <div className="px-1.5 py-0.5 bg-foreground/10 rounded-md border border-foreground/20">
                        <span className="text-xs text-foreground/80 font-medium">Images</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer info */}
            <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-[rgba(106,73,252,0.05)] border border-[rgba(106,73,252,0.2)] rounded-lg">
              <p className="text-xs text-foreground/70 text-center leading-relaxed">
                ✨ AI-powered feedback analysis & real-time collaboration included
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}