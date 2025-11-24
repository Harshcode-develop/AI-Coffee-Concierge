import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Coffee } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (coffee: Coffee, size: CartItem['size']) => void;
  removeItem: (id: string, size: CartItem['size']) => void;
  updateQuantity: (id: string, size: CartItem['size'], quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  notification: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      notification: null,
      showNotification: (message) => set({ notification: message }),
      hideNotification: () => set({ notification: null }),
      addItem: (coffee, size) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === coffee.id && item.size === size
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === coffee.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            notification: `Added ${coffee.name} to cart`,
          });
        } else {
          set({
            items: [...items, { ...coffee, quantity: 1, size }],
            notification: `Added ${coffee.name} to cart`,
          });
        }
      },
      removeItem: (id, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        });
      },
      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'coffee-cart-storage',
    }
  )
);
