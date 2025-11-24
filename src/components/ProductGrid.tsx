import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CoffeeCard } from './CoffeeCard';
import { allProducts } from '../data/products';
import { useProductStore } from '../store/useProductStore';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category } from '../types';

const categories: Category[] = ['Coffee', 'Tea', 'Sandwiches', 'Desserts'];

export const ProductGrid: React.FC = () => {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const selectedCategory = useProductStore((state) => state.selectedCategory);

  // Helper to filter products
  const getFilteredProducts = React.useCallback((category: Category | 'All') => {
    return allProducts.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery]);

  if (selectedCategory === 'All' && !searchQuery) {
    return (
      <div className="py-16 px-6 max-w-[90%] mx-auto space-y-20">
        {categories.map((category) => {
          const categoryProducts = getFilteredProducts(category);
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white border-l-4 border-neon-primary pl-4">
                  {category}
                </h2>
                <span className="text-gray-500 dark:text-gray-400">
                  {categoryProducts.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product) => (
                  <CoffeeCard key={product.id} coffee={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  const filteredProducts = getFilteredProducts(selectedCategory);

  return (
    <section className="py-16 px-6 max-w-[90%] mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          {selectedCategory !== 'All' && (
            <button
              onClick={() => useProductStore.getState().setSelectedCategory('All')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-300"
              title="Back to All"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {selectedCategory === 'All' ? 'Search Results' : selectedCategory}
          </h2>
        </div>
        <span className="text-gray-500 dark:text-gray-400">
          {filteredProducts.length} items
        </span>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <CoffeeCard key={product.id} coffee={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-500 dark:text-gray-400"
        >
          <p className="text-xl">No items found matching your criteria.</p>
        </motion.div>
      )}
    </section>
  );
};
