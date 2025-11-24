import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-1 p-1 bg-neon-dark/50 backdrop-blur-md rounded-full border border-neon-secondary/20">
      {(['light', 'system', 'dark'] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={cn(
            "p-2 rounded-full transition-all duration-300 relative",
            theme === t ? "text-neon-dark" : "text-neon-accent hover:text-neon-secondary"
          )}
        >
          {theme === t && (
            <motion.div
              layoutId="theme-active"
              className="absolute inset-0 bg-neon-secondary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
          <span className="relative z-10">
            {t === 'light' && <Sun size={16} />}
            {t === 'dark' && <Moon size={16} />}
            {t === 'system' && <Monitor size={16} />}
          </span>
        </button>
      ))}
    </div>
  );
};
