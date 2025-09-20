'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Folder, 
  Users, 
  Activity, 
  BarChart3, 
  Palette, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  Monitor,
  Search
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/providers/usetheme';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const bottomNavigation = [
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help & Feedback', icon: HelpCircle, path: '/help' },
];

// Main Layout Component
export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme, actualTheme } = useTheme();

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  return (
    <div className="flex h-screen w-full bg-white text-gray-900 dark:bg-[#0A0A0A] dark:text-white">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-100 text-gray-900 border border-gray-200 dark:bg-[#171717] dark:text-white dark:border-[#2E2E2E]"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard',
      isActive: pathname === '/dashboard' || pathname === '/' 
    },
    { 
      id: 'my-projects', 
      label: 'My Projects', 
      icon: Folder, 
      path: '/my-projects',
      isActive: pathname === '/my-projects' 
    },
    { 
      id: 'shared-with-me', 
      label: 'Shared with me', 
      icon: Users, 
      path: '/shared-with-me',
      isActive: pathname === '/shared-with-me' 
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: Activity, 
      path: '/activity',
      isActive: pathname === '/activity' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      path: '/analytics',
      isActive: pathname === '/analytics' 
    },
    { 
      id: 'branding', 
      label: 'Branding', 
      icon: Palette, 
      path: '/branding',
      isActive: pathname === '/branding' 
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 xl:w-[280px] bg-white text-gray-900 dark:bg-[#171717] dark:text-white flex-col p-4 border-r border-gray-200 dark:border-[#2E2E2E]">
        <SidebarContent 
          navigation={navigation} 
          bottomNavigation={bottomNavigation} 
          pathname={pathname}
          onMobileClose={onMobileClose}
        />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div 
        className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white text-gray-900 dark:bg-[#171717] dark:text-white flex flex-col p-4 border-r border-gray-200 dark:border-[#2E2E2E] z-50 transition-colors duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-out lg:hidden`}
        initial={{ x: -320 }}
        animate={{ x: isMobileOpen ? 0 : -320 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#262626]"
          onClick={onMobileClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="h-5 w-5" />
        </motion.button>
        
        <SidebarContent 
          navigation={navigation} 
          bottomNavigation={bottomNavigation} 
          pathname={pathname}
          onMobileClose={onMobileClose}
        />
      </motion.div>
    </>
  );
}

function SidebarContent({ 
  navigation, 
  bottomNavigation, 
  pathname,
  onMobileClose 
}: {
  navigation: any[],
  bottomNavigation: any[],
  pathname: string,
  onMobileClose?: () => void
}) {
  return (
    <>
      {/* Top section: take remaining space above bottom area */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#6a49fc] rounded-[10px] flex items-center justify-center">
            <span className="text-white font-semibold text-[14px]">J</span>
          </div>
          <span className="text-gray-900 dark:text-white font-semibold text-2xl">Jottyme</span>
        </div>
        
        <nav className="space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.isActive;
            
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={onMobileClose}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-100 dark:bg-[#262626] text-[#6a49fc] relative' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#262626] dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#6a49fc] rounded-r-[10px]"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="font-medium text-[0.93em]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile + Bottom section: fixed to 35% of the sidebar height */}
      <div className="h-[35vh] min-h-[180px] max-h-[35%] pt-4 flex flex-col justify-between">
        {/* border bar stretched to the full width */}
        <div className="-mx-4 border-t border-gray-200 dark:border-[#2E2E2E]" />

        <div className="px-1 flex-1 flex flex-col gap-5 xl:gap-7">
          {/* Profile */}
          <div className="pt-6">
            <Link 
              href="/profile"
              className="flex items-center gap-3 rounded-lg bg-gray-50 border border-gray-200 dark:bg-[#222222] dark:border-[#2E2E2E] p-3 hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[rgba(106,73,252,0.2)] overflow-hidden bg-gray-100 dark:bg-[#222222] flex items-center justify-center font-bold">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel" 
                  alt="Samuel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 dark:text-white font-medium text-[14px]">Samuel</div>
                <div className="text-gray-600 dark:text-gray-400 text-[12px]">Product Designer</div>
              </div>
            </Link>
          </div>

          {/* Bottom Navigation */}
          <div className="space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={onMobileClose}
                  className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-[#262626] text-[#6a49fc] relative font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-[#262626] dark:hover:text-white font-semibold'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#6a49fc] rounded-r-[10px]"
                      layoutId="bottomActiveIndicator"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}