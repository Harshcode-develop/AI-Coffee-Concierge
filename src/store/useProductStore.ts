import { create } from 'zustand';
import type { Category } from '../types';

interface ProductStore {
  searchQuery: string;
  selectedCategory: Category | 'All';
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | 'All') => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  searchQuery: '',
  selectedCategory: 'All',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
