import React from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-coffee-50 dark:bg-neon-dark transition-colors duration-300 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-neon-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-neon-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-64 h-64 bg-coffee-500/10 rounded-full blur-3xl"
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 w-full px-4 md:px-6 md:max-w-[90%] mx-auto pb-20">
        {children}
      </main>
    </div>
  );
};
