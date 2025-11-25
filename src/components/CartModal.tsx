import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, CreditCard, CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

export const CartModal: React.FC = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center pointer-events-none p-4 pt-24"
          >
            <div className="bg-white/90 dark:bg-neon-dark/10 backdrop-blur-md w-full max-w-lg rounded-3xl shadow-2xl pointer-events-auto relative overflow-hidden border border-white/20 flex flex-col max-h-[600px]">
              
              {/* Header */}
              <div className="p-5 border-b border-gray-100 dark:border-white/10 flex items-center justify-between bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                <button
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="overflow-y-auto p-5 space-y-3 max-h-[400px]">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                      <Trash2 size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Your cart is empty</p>
                    <button
                      onClick={toggleCart}
                      className="px-5 py-2 bg-neon-primary text-white rounded-full font-bold text-sm hover:bg-neon-primary/80 transition-colors"
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
                      className="flex gap-3 bg-gray-50/50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-neon-primary/30 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-neon-secondary text-base">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2 bg-white dark:bg-black/20 rounded-lg p-1 border border-gray-100 dark:border-white/5 text-gray-900 dark:text-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-md transition-colors"
                            >
                              <Plus size={12} />
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
                <div className="p-5 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-black/20 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 dark:text-gray-400 text-base">Total</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut || isSuccess}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 text-base shadow-lg shadow-neon-primary/20",
                      isSuccess
                        ? "bg-green-500"
                        : "bg-neon-primary hover:bg-neon-primary/90 hover:shadow-neon-primary/40 hover:scale-[1.02]"
                    )}
                  >
                    {isCheckingOut ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
