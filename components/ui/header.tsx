import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeSwitcher } from './themeSwitcher';
import { useTheme } from '@/providers/usetheme';
import { NotificationsModal } from '../modals/notificationsModal';
import { ProfileModal } from '../modals/profileModal';

interface HeaderProps {
  onSearchClick?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToMyProjects?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToActivity?: () => void;
  onProjectClick?: (project: any) => void;
  onMobileMenuClick?: () => void;
}

export function Header({ 
  onSearchClick,
  onNavigateToSettings,
  onNavigateToBilling,
  onNavigateToPrivacy,
  onNavigateToNotifications,
  onNavigateToMyProjects,
  onNavigateToAnalytics,
  onNavigateToActivity,
  onProjectClick,
  onMobileMenuClick
}: HeaderProps = {}) {
  const { theme, setTheme } = useTheme();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="bg-card border-b border-border px-4 sm:px-8 py-4 transition-colors duration-300"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center w-full gap-4">
          {/* Mobile hamburger menu button */}
          <motion.button
            className="lg:hidden p-2 rounded-[8px] hover:bg-accent transition-colors"
            onClick={onMobileMenuClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Search */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[448px] relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="bg-input-background border-border pl-10 sm:pl-12 h-9 text-foreground placeholder:text-muted-foreground text-sm sm:text-base transition-colors duration-300 cursor-pointer w-full"
                onClick={onSearchClick}
                readOnly
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Switcher */}
            <ThemeSwitcher
              theme={theme}
              onThemeChange={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
            />
            
            {/* Notifications Button */}
            <motion.button
              className="p-2 rounded-[8px] hover:bg-accent transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-4 h-4 text-foreground" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
            </motion.button>
            
            {/* Avatar */}
            <motion.div
              className="w-8 h-8 rounded-full border-2 border-[rgba(106,73,252,0.2)] overflow-hidden cursor-pointer hover:border-[rgba(106,73,252,0.5)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(true)}
            >
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel" 
                alt="Samuel"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Modal */}
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateToSettings={onNavigateToSettings}
        onNavigateToBilling={onNavigateToBilling}
        onNavigateToPrivacy={onNavigateToPrivacy}
        onNavigateToNotifications={onNavigateToNotifications}
      />
    </>
  );
}
