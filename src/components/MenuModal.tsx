import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import type { Category } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: { name: Category; image: string }[] = [
  { 
    name: 'Coffee', 
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    name: 'Tea', 
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    name: 'Sandwiches', 
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    name: 'Desserts', 
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop' 
  },
];

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const { setSelectedCategory } = useProductStore();

  const handleCategoryClick = (category: Category | 'All') => {
    setSelectedCategory(category);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/90 dark:bg-neon-dark/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-4xl mx-4 pointer-events-auto relative overflow-hidden border border-white/20">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>

              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                Our Menu
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleCategoryClick(category.name)}
                    className="group flex flex-col items-center gap-4"
                  >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-transparent group-hover:border-neon-primary transition-all duration-300 shadow-lg group-hover:shadow-neon-primary/50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <span className="text-xl font-medium text-gray-700 dark:text-gray-200 group-hover:text-neon-primary transition-colors">
                      {category.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
