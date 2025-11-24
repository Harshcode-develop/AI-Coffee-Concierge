import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const Toast: React.FC = () => {
  const { notification, hideNotification } = useCartStore();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 1500); // Display for 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-200 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md text-white dark:text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-3 min-w-[300px] justify-center"
        >
          <CheckCircle className="text-green-500" size={20} />
          <span className="font-medium">{notification}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
