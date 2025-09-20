import { ReactNode } from 'react';
import { Header } from './header';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
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
  onMobileMenuClick?: () => void;
}

export function Layout({ 
  children, 
  showSidebar = true, 
  className = '', 
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
  onProjectClick,
  onMobileMenuClick
}: LayoutProps) {
  return (
    <div className={`flex-1 bg-background flex flex-col h-full transition-colors duration-300 ${className}`}>
      <Header 
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
        onMobileMenuClick={onMobileMenuClick}
      />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}