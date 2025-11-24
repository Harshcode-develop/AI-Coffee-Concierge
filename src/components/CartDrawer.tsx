import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, CreditCard, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        toggleCart();
      }, 3000);
    }, 2000);
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
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neon-dark border-l border-neon-secondary/20 shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <Trash2 size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  <button
                    onClick={toggleCart}
                    className="px-6 py-2 bg-neon-primary text-white rounded-full font-bold hover:bg-neon-primary/80 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Size: {item.size}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neon-secondary">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-3 bg-white dark:bg-black/20 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || isSuccess}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300",
                    isSuccess
                      ? "bg-green-500"
                      : "bg-neon-primary hover:bg-neon-primary/90 hover:shadow-[0_0_20px_rgba(255,46,99,0.4)]"
                  )}
                >
                  {isCheckingOut ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      Payment Successful!
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      Checkout
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
