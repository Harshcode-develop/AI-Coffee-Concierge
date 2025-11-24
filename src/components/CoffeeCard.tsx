import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Info } from 'lucide-react';
import type { Coffee } from '../types';
import { useCartStore } from '../store/useCartStore';

interface CoffeeCardProps {
  coffee: Coffee;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = React.memo(({ coffee }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group w-full bg-white dark:bg-neon-dark/40 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-100 dark:border-neon-secondary/20 shadow-xl hover:shadow-2xl hover:shadow-neon-primary/20 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={coffee.image}
          alt={coffee.name}
          loading="lazy"
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Floating Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {coffee.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-bold bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">{coffee.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-neon-secondary transition-colors">
            {coffee.name}
          </h3>
          <span className="text-lg font-bold text-neon-primary">
            ${coffee.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {coffee.description}
        </p>

        {/* Ingredients Info (Revealed on Hover) */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          className="overflow-hidden mb-4"
        >
          <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <Info size={12} />
              Contains
            </div>
            <div className="flex flex-wrap gap-2">
              {coffee.ingredients.map((ing) => (
                <span key={ing.name} className="text-xs px-2 py-1 bg-white dark:bg-white/5 rounded-md text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                  {ing.name}: <span className="font-bold text-neon-secondary">{ing.amount}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <button
          onClick={() => addItem(coffee, 'M')}
          className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-neon-primary hover:text-white dark:hover:bg-neon-primary dark:hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,46,99,0.4)]"
        >
          <Plus size={18} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
});
