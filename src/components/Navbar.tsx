import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, Bot, Utensils, Search } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useChatStore } from '../store/useChatStore';
import { useProductStore } from '../store/useProductStore';
import { ThemeToggle } from './ThemeToggle';
import { MenuModal } from './MenuModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const toggleChat = useChatStore((state) => state.toggleChat);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
          isScrolled 
            ? "bg-white/80 dark:bg-neon-dark/80 backdrop-blur-lg shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-[90%] mx-auto flex items-center justify-between pl-21">
          <div className="flex-1 flex items-center gap-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setSearchQuery('');
                useProductStore.getState().setSelectedCategory('All');
              }}
            >
              <div className="relative">
                <Coffee className="text-neon-primary dark:text-neon-secondary fill-neon-primary/80 dark:fill-neon-secondary/20" size={32} />
                {/* Vapour Animations */}
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-neon-primary/50 dark:bg-neon-secondary/50 rounded-full blur-[1px]"
                  animate={{ y: [-2, -10], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                />
                <motion.div
                  className="absolute -top-2 left-[30%] w-1 h-2 bg-neon-primary/40 dark:bg-neon-secondary/40 rounded-full blur-[1px]"
                  animate={{ y: [-2, -8], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                  className="absolute -top-2 right-[30%] w-1 h-2.5 bg-neon-primary/40 dark:bg-neon-secondary/40 rounded-full blur-[1px]"
                  animate={{ y: [-2, -9], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent hidden md:block">
                AuroraBrew
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block w-full max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-neon-primary transition-colors" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, tea, desserts..."
                className="w-full bg-gray-100 dark:bg-white/10 border border-transparent dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-gray-800 dark:text-neon-accent placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-primary/50 focus:border-neon-primary transition-all text-center"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end gap-4 md:gap-6 pr-21">
            {/* Mobile Search Toggle */}
            <button 
              className="md:hidden p-2 text-gray-800 dark:text-neon-accent"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={22} />
            </button>

            <ThemeToggle />
            
            <button
              onClick={toggleChat}
              className="p-2 text-gray-800 dark:text-neon-accent hover:text-neon-primary dark:hover:text-neon-secondary transition-colors"
              aria-label="Toggle AI Chat"
            >
              <Bot size={22} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-800 dark:text-neon-accent hover:text-neon-primary dark:hover:text-neon-secondary transition-colors group"
              aria-label="Toggle Cart"
            >
              <ShoppingBag size={21} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-neon-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-gray-100 dark:bg-white/10 border border-transparent dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-gray-800 dark:text-neon-accent focus:outline-none focus:ring-2 focus:ring-neon-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating Menu Button */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-51 z-50 px-6 py-3 bg-neon-primary/80 backdrop-blur-md text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
      >
        <Utensils size={20} />
        <span className="font-bold">Menu</span>
      </motion.button>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
