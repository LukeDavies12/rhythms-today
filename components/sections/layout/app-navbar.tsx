'use client';

import { signOut } from '@/actions/auth';
import DesktopIcon from '@/components/icons/desktop-icon';
import LogOutIcon from '@/components/icons/log-out-icon';
import MoonIcon from '@/components/icons/moon-icon';
import SettingsIcon from '@/components/icons/settings-icon';
import SunIcon from '@/components/icons/sun-icon';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Logo from '../brand/logo';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'top-left' | 'top-right';
}

function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    'top-left': 'bottom-full right-0 mb-2',
    'top-right': 'bottom-full left-0 mb-2'
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`
          absolute z-50 px-2 py-1 text-xs font-medium
          bg-neutral-800 dark:bg-neutral-200
          text-neutral-100 dark:text-neutral-800
          shadow-lg
          whitespace-nowrap
          pointer-events-none
          animate-in fade-in-0 zoom-in-95 duration-200
          ${positionClasses[position]}
        `}>
          {content}
          <div className={`
            absolute w-2 h-2 rotate-45
            bg-neutral-800 dark:bg-neutral-200
            ${position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 -mt-1' : 
              position === 'top-left' ? 'top-full right-2 -mt-1' : 
              'top-full left-2 -mt-1'}
          `} />
        </div>
      )}
    </div>
  );
}

function ThemeButton({ theme, onCycleTheme }: { theme: string | undefined, onCycleTheme: () => void }) {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon size={18} className="transition-transform duration-200 group-hover:rotate-12" />;
      case 'dark':
        return <MoonIcon size={18} className="transition-transform duration-200 group-hover:-rotate-12" />;
      default:
        return <DesktopIcon size={18} className="transition-transform duration-200 group-hover:scale-110" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark';
      case 'dark':
        return 'Switch to System';
      default:
        return 'Switch to Light';
    }
  };

  return (
    <Tooltip content={getThemeLabel()}>
      <button
        onClick={onCycleTheme}
        className="group p-2.5 transition-all duration-200 ease-out
          text-neutral-600 dark:text-neutral-400
          hover:text-neutral-900 dark:hover:text-neutral-100
          hover:bg-neutral-100 dark:hover:bg-neutral-800
          active:bg-neutral-200 dark:active:bg-neutral-700
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 cursor-pointer"
        aria-label={getThemeLabel()}
      >
        {getThemeIcon()}
      </button>
    </Tooltip>
  );
}

function ActionButton({ 
  onClick, 
  icon, 
  label, 
  variant = 'default',
  tooltipPosition = 'top'
}: { 
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: 'default' | 'danger';
  tooltipPosition?: 'top' | 'top-left' | 'top-right';
}) {
  const baseClasses = "group p-2.5 transition-all duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 cursor-pointer";
  const variantClasses = variant === 'danger' 
    ? `text-neutral-600 dark:text-neutral-400
       hover:text-red-600 dark:hover:text-red-400
       hover:bg-red-50 dark:hover:bg-red-900/20
       active:bg-red-100 dark:active:bg-red-900/30
       focus:ring-red-300 dark:focus:ring-red-600`
    : `text-neutral-600 dark:text-neutral-400
       hover:text-neutral-900 dark:hover:text-neutral-100
       hover:bg-neutral-100 dark:hover:bg-neutral-800
       active:bg-neutral-200 dark:active:bg-neutral-700
       focus:ring-neutral-300 dark:focus:ring-neutral-600`;

  return (
    <Tooltip content={label} position={tooltipPosition}>
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses}`}
        aria-label={label}
      >
        <div className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
          {icon}
        </div>
      </button>
    </Tooltip>
  );
}

export default function AppNavbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40
        bg-white dark:bg-neutral-950
        border-t border-neutral-200/50 dark:border-neutral-800/50
        px-4 py-2 md:px-6">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Logo url="/app" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            <div className="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            <div className="w-9 h-9 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme || 'light');
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40
      bg-white/90 dark:bg-neutral-950/90
      backdrop-blur-md backdrop-saturate-150
      border-t border-neutral-200/50 dark:border-neutral-800/50
      px-4 py-2 md:px-6
      shadow-lg shadow-neutral-900/5 dark:shadow-neutral-100/5">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo url="/app" />
        </div>
        
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 ml-2">
            <ThemeButton theme={theme} onCycleTheme={cycleTheme} />
            
            <ActionButton
              onClick={() => {}}
              icon={<SettingsIcon size={18} />}
              label="Settings"
            />
            
            <ActionButton
              onClick={handleSignOut}
              icon={<LogOutIcon size={18} />}
              label="Log out"
              variant="danger"
              tooltipPosition="top-left"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}