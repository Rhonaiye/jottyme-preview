import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { X, Share, Lock, Globe, Link, Send, Users, Copy, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    name: string;
    url: string;
    type: string;
  };
}

export function ShareModal({ isOpen, onClose, project }: ShareModalProps) {
  const [isPublic, setIsPublic] = useState(true);
  const [emailInput, setEmailInput] = useState('psalmwelloladokun@gmail.com');
  const [selectedPermission, setSelectedPermission] = useState('Can comment');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const permissions = [
    { value: 'Can view', label: 'Can view', description: 'Can only view the project' },
    { value: 'Can comment', label: 'Can comment', description: 'Can view and add comments' },
    { value: 'Can edit', label: 'Can edit', description: 'Can view, comment and edit' }
  ];

  const shareUrl = `jottyme.app/p/${project.id.slice(0, 6)}`;

  const handleTogglePrivacy = () => {
    setIsPublic(!isPublic);
    toast.success(isPublic ? 'Project is now private' : 'Project is now public');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    toast.success('Link copied to clipboard');
  };

  const handleInviteByEmail = () => {
    if (!emailInput.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    
    // Simulate sending invitation
    toast.success(`Invitation sent to ${emailInput}`);
    setEmailInput('');
  };

  const handleCopyLinkButton = () => {
    navigator.clipboard.writeText(`https://${shareUrl}`);
    toast.success('Share link copied');
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-card rounded-[14px] max-w-[512px] w-full mx-4 border border-border shadow-[0px_25px_50px_-12px_rgba(106,73,252,0.1)]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={handleModalClick}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[rgba(106,73,252,0.1)] p-2.5 rounded-[10px]">
                  <Share className="w-5 h-5 text-[#6a49fc]" />
                </div>
                <div>
                  <h2 className="text-foreground text-[18px] leading-[28px] font-normal">Share project</h2>
                  <p className="text-muted-foreground text-[14px] leading-[20px] max-w-[250px] truncate">
                    {project.name}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Link Section */}
          <div className="px-6 pb-6">
            <div className="relative h-[96.4px]">
              {/* Share link header */}
              <div className="flex items-center justify-between">
                <span className="text-foreground text-[14px] leading-[14px] font-medium">Share link</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[12px] leading-[16px]">
                    {isPublic ? 'Public' : 'Private'}
                  </span>
                  <div className="w-4 h-4">
                    {isPublic ? (
                      <Globe className="w-4 h-4 text-[#05DF72]" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <button
                    onClick={handleTogglePrivacy}
                    className={`h-[18.4px] w-8 rounded-full p-[1px] transition-all duration-200 ${
                      isPublic ? 'bg-[#6a49fc]' : 'bg-gray-500'
                    }`}
                  >
                    <motion.div
                      className="bg-white w-4 h-4 rounded-full shadow-sm"
                      animate={{ x: isPublic ? 15 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  </button>
                </div>
              </div>

              {/* URL input and copy button */}
              <div className="absolute top-[30.4px] left-0 right-0 flex gap-2 items-center">
                <div className="flex-1 bg-input border border-border rounded-[10px] px-[13px] py-[11px] flex items-center gap-2">
                  <Link className="w-4 h-4 text-[#6a49fc]" />
                  <span className="text-foreground text-[14px] leading-[20px] font-['Menlo:Regular',_sans-serif]">
                    {shareUrl}
                  </span>
                </div>
                <Button
                  onClick={handleCopyLink}
                  className="bg-[#6a49fc] hover:bg-[#5a3efc] h-9 px-3 py-2.5 rounded-[10px] flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-white text-[14px] leading-[20px] font-medium">Copy</span>
                </Button>
              </div>

              {/* Privacy description */}
              <div className="absolute top-[80.4px] left-0 right-0">
                <p className="text-muted-foreground text-[12px] leading-[16px]">
                  {isPublic 
                    ? 'Anyone on the internet can view this project'
                    : 'Only people with this link can access'
                  }
                </p>
              </div>
            </div>

            {/* Invite by email section */}
            <div className="mt-5 space-y-3">
              <label className="text-foreground text-[14px] leading-[14px] font-medium">
                Invite by email
              </label>
              <div className="flex gap-2">
                <div className="flex-1 bg-input border border-border rounded-[10px] px-[13px] py-[11px]">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-transparent text-foreground text-[14px] placeholder:text-muted-foreground outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleInviteByEmail();
                      }
                    }}
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-input border border-border rounded-[10px] px-[13px] py-[9px] w-[120px] flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <span className="text-foreground text-[14px] leading-[20px] truncate">
                      {selectedPermission}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-[10px] shadow-lg z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {permissions.map((permission) => (
                          <button
                            key={permission.value}
                            onClick={() => {
                              setSelectedPermission(permission.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-[13px] py-[9px] text-left hover:bg-accent transition-colors first:rounded-t-[10px] last:rounded-b-[10px] ${
                              selectedPermission === permission.value ? 'bg-[rgba(106,73,252,0.1)]' : ''
                            }`}
                          >
                            <div className="text-foreground text-[14px] leading-[16px]">
                              {permission.label}
                            </div>
                            <div className="text-muted-foreground text-[12px] leading-[14px] mt-0.5">
                              {permission.description}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  onClick={handleInviteByEmail}
                  disabled={!emailInput.trim()}
                  className={`h-10 px-3 py-2 rounded-[10px] transition-opacity ${
                    emailInput.trim() 
                      ? 'bg-[#6a49fc] hover:bg-[#5a3efc] opacity-100' 
                      : 'bg-[#6a49fc] opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-2 flex gap-2">
              <Button
                onClick={handleCopyLinkButton}
                variant="outline"
                className="flex-1 h-9 bg-transparent border-border text-foreground hover:bg-accent rounded-[8px] flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span className="text-[14px] leading-[20px] font-medium">Copy link</span>
              </Button>
              <Button
                variant="outline"
                className="h-9 px-[13px] py-[9px] bg-transparent border-border text-foreground hover:bg-accent rounded-[8px]"
              >
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}