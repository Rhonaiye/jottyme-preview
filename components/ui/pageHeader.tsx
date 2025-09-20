import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Layout } from './layout';
import { useTheme } from '@/providers/usetheme';
import { Moon, Sun, Monitor } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  maxWidth?: string;
  showThemeToggle?: boolean;
  onMobileMenuClick?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToBilling?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToMyProjects?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToActivity?: () => void;
  onProjectClick?: (project: any) => void;
}

export function PageHeader({ 
  title, 
  description, 
  children, 
  className = '', 
  maxWidth = 'max-w-[896px]',
  showThemeToggle = true,
  onMobileMenuClick,
  onSearchClick,
  onNotificationsClick,
  onAvatarClick,
  onNavigateToSettings,
  onNavigateToBilling,
  onNavigateToPrivacy,
  onNavigateToNotifications,
  onNavigateToMyProjects,
  onNavigateToAnalytics,
  onNavigateToActivity,
  onProjectClick
}: PageHeaderProps) {
  const { theme, setTheme, actualTheme } = useTheme();
  console.log(theme, actualTheme)

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Moon className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Layout 
      className={className} 
      onMobileMenuClick={onMobileMenuClick}
      onSearchClick={onSearchClick}
      onNotificationsClick={onNotificationsClick}
      onAvatarClick={onAvatarClick}
      onNavigateToSettings={onNavigateToSettings}
      onNavigateToBilling={onNavigateToBilling}
      onNavigateToPrivacy={onNavigateToPrivacy}
      onNavigateToNotifications={onNavigateToNotifications}
      onNavigateToMyProjects={onNavigateToMyProjects}
      onNavigateToAnalytics={onNavigateToAnalytics}
      onNavigateToActivity={onNavigateToActivity}
      onProjectClick={onProjectClick}
    >
      <div className={`${maxWidth} w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8`}>
        {/* Page Header with Theme Toggle */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-foreground text-lg sm:text-xl font-semibold">{title}</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">{description}</p>
            </div>
            
            {showThemeToggle && (
              <div className="flex items-center gap-2">
                <button
                  onClick={cycleTheme}
                  className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  title={`Current theme: ${theme} (${actualTheme}). Click to cycle through themes.`}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getThemeIcon()}
                  </motion.div>
                </button>
                
                {/* Theme indicator text (optional) */}
                <span className="hidden sm:inline-block text-xs text-muted-foreground capitalize">
                  {theme}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {children}
      </div>
    </Layout>
  );
}

// Alternative: Dropdown theme selector component
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="relative inline-block">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        className="appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}