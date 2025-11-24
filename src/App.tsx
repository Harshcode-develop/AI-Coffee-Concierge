import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { ProductGrid } from './components/ProductGrid';
import { CartModal } from './components/CartModal';
import { AIChat } from './components/AIChat';
import { Toast } from './components/Toast';
import { useThemeStore } from './store/useThemeStore';
import { useCartStore } from './store/useCartStore';
import { useChatStore } from './store/useChatStore';
import { motion } from 'framer-motion';

function App() {
  const { theme, setTheme } = useThemeStore();

  // Initialize theme and reset UI state on mount
  useEffect(() => {
    setTheme(theme);
    
    // Reset UI state on refresh/load
    useCartStore.setState({ isOpen: false });
    useChatStore.setState({ isOpen: false });
  }, [setTheme, theme]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-5xl font-bold mt-6 mb-9 pt-9 bg-linear-to-r from-orange-500 via-coffee-700 to-amber-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
          AuroraBrew: Sip the Spectrum.
        </h1>
        <p className="px-12 text-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover your perfect cup, crafted by tradition and perfected by light. 
          We blend timeless coffee artistry with intelligent flavor curation to pour you a uniquely brilliant brew, every time.
        </p>
      </motion.div>

      <ProductGrid />
      <CartModal />
      <AIChat />
      <Toast />
    </Layout>
  );
}

export default App;
