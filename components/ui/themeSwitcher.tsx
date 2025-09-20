'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeSwitcherProps {
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function ThemeSwitcher({ theme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4 text-foreground" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-foreground" />;
      case 'system':
        return <Monitor className="w-4 h-4 text-foreground" />;
    }
  };

  const themes = [
    {
      value: 'light' as const,
      label: 'Light',
      icon: <Sun className="w-4 h-4 mr-2 text-foreground" />
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      icon: <Moon className="w-4 h-4 mr-2 text-foreground" />
    },
    {
      value: 'system' as const,
      label: 'System',
      icon: <Monitor className="w-4 h-4 mr-2 text-foreground" />
    }
  ];

  const handleThemeSelect = (newTheme: 'light' | 'dark' | 'system') => {
    onThemeChange(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 rounded-[8px] flex items-center justify-center hover:bg-accent transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getIcon()}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full mt-1 right-0 w-32 bg-popover border border-border rounded-[8px] shadow-lg z-20"
            >
              <div className="p-[5px]">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.value}
                    onClick={() => handleThemeSelect(themeOption.value)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-[6px] text-popover-foreground text-[14px] hover:bg-accent transition-colors ${
                      theme === themeOption.value ? 'bg-accent' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      {themeOption.icon}
                      {themeOption.label}
                    </div>
                    {theme === themeOption.value && (
                      <motion.div
                        className="w-2 h-2 bg-[#6a49fc] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}