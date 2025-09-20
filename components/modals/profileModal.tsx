import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Settings, 
  LogOut, 
  CreditCard,
  Shield,
  Bell,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useTheme } from '@/providers/usetheme';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToNotifications?: () => void;
}

export function ProfileModal({ isOpen, onClose, onNavigateToSettings, onNavigateToBilling, onNavigateToPrivacy, onNavigateToNotifications }: ProfileModalProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const handleSettingsClick = () => {
    onNavigateToSettings?.();
    onClose();
  };

  const handleBillingClick = () => {
    onNavigateToBilling?.();
    onClose();
  };

  const handlePrivacyClick = () => {
    onNavigateToPrivacy?.();
    onClose();
  };

  const handleNotificationsClick = () => {
    onNavigateToNotifications?.();
    onClose();
  };

  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Signing out...');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header with User Info */}
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-[#6a49fc]/30 overflow-hidden">
                  <img 
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Samuel&hair=long01,long02,long03,long04&backgroundColor=b6e3f4" 
                    alt="Samuel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-card rounded-full"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-foreground font-semibold">Samuel Chen</h3>
                <p className="text-muted-foreground text-sm truncate">Product Designer</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Actions */}
          <div className="p-2">
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent rounded-lg transition-colors group"
            >
              <Settings className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Account Settings
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground transition-colors" />
            </button>

            <button
              onClick={handleBillingClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent rounded-lg transition-colors group"
            >
              <CreditCard className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Billing & Subscription
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground transition-colors" />
            </button>

            <button
              onClick={handlePrivacyClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent rounded-lg transition-colors group"
            >
              <Shield className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Privacy & Security
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground transition-colors" />
            </button>

            <button
              onClick={handleNotificationsClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent rounded-lg transition-colors group"
            >
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Notifications
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-foreground transition-colors" />
            </button>
          </div>

          <Separator />

          {/* Theme Selector */}
          <div className="p-4">
            <div className="mb-3">
              <span className="text-foreground text-sm font-medium">Theme</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === 'light'
                    ? 'border-[#6a49fc] bg-[#6a49fc]/10'
                    : 'border-border hover:border-[#6a49fc]/50 hover:bg-accent'
                }`}
              >
                <Sun className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Light</span>
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'border-[#6a49fc] bg-[#6a49fc]/10'
                    : 'border-border hover:border-[#6a49fc]/50 hover:bg-accent'
                }`}
              >
                <Moon className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Dark</span>
              </button>

              <button
                onClick={() => handleThemeChange('system')}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === 'system'
                    ? 'border-[#6a49fc] bg-[#6a49fc]/10'
                    : 'border-border hover:border-[#6a49fc]/50 hover:bg-accent'
                }`}
              >
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">System</span>
              </button>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent rounded-lg transition-colors group">
              <Zap className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-foreground group-hover:text-foreground transition-colors">
                Upgrade to Pro
              </span>
              <div className="ml-auto bg-gradient-to-r from-yellow-500 to-yellow-600 px-2 py-0.5 rounded-full">
                <span className="text-white text-xs font-medium">50% Off</span>
              </div>
            </button>
          </div>

          <Separator />

          {/* Sign Out */}
          <div className="p-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-destructive/10 rounded-lg transition-colors group"
            >
              <LogOut className="w-5 h-5 text-destructive group-hover:text-destructive transition-colors" />
              <span className="text-destructive group-hover:text-destructive transition-colors">
                Sign Out
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}