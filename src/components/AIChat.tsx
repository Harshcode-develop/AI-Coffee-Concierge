import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Mic, Settings, Key, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useCartStore } from '../store/useCartStore';
import { useProductStore } from '../store/useProductStore';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { chatWithGemini } from '../services/gemini';
import { allProducts as products } from '../data/products';

export const AIChat: React.FC = () => {
  const { messages, isOpen, toggleChat, addMessage } = useChatStore();
  const { items, addItem } = useCartStore();
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [suggestedItem, setSuggestedItem] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ... (existing useEffects)

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowSettings(false);
  };

  const deleteApiKey = () => {
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
    setShowSettings(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping, suggestedItem]);

  // Speech to Text
  const handleSpeechResult = (text: string) => {
    setInput(text);
  };

  const { isListening, isSupported, startListening, stopListening } = useSpeechToText({
    onResult: handleSpeechResult
  });

  // Text to Speech
  const speakResponse = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Strip markdown characters for cleaner speech
    const cleanText = text.replace(/[*#_`]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    // Try to select a pleasant voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.name.includes('Google US English') || voice.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    useChatStore.getState().clearChat();
    setSuggestedItem(null);
    // Speak the welcome message
    speakResponse("Hi! I'm Aurora, your AI Coffee Guide. Tell me what flavors you like, or ask for a recommendation based on your mood!");
  };

  const handleSuggestionResponse = (response: 'yes' | 'no') => {
    if (!suggestedItem) return;

    if (response === 'yes') {
      const msg = `Yes, please add the ${suggestedItem.name} to my cart.`;
      addMessage({ role: 'user', content: msg });
      processUserMessage(msg);
    } else {
      setSuggestedItem(null);
      // Optional: Send "No thanks" or just clear
    }
    setSuggestedItem(null);
  };

  const processUserMessage = async (message: string) => {
    setIsTyping(true);
    try {
      // Detailed menu context
      const menuDetails = products.map(p => 
        `- ${p.name} (${p.category}): ${p.description}. Ingredients: ${p.ingredients.map(i => i.name).join(', ')}. Price: $${p.price}`
      ).join('\n');

      // Context for the AI
      const context = `
        You are Aurora, an AI assistant for a futuristic coffee shop called AuroraBrew.
        
        STRICT RULES:
        1. You must ONLY recommend items from the current menu list below. Do not invent items.
        2. When recommending an item, explain WHY it's a good choice.
        3. **CRITICAL:** When you recommend a specific item, append the tag [REC: Item Name] at the end of your response.
        4. **CRITICAL:** If the user explicitly asks to add an item to cart or confirms a purchase (e.g., "yes, add it"), append the tag [ADD: Item Name] at the end.
        5. **CONFIRMATION MSG:** When adding an item, say "I've added [Item] to your cart. Enjoy your [Category]!" (e.g., "Enjoy your coffee!", "Enjoy your sandwich!").
        6. Always ask "Shall I add this to your cart?" after recommending an item.
        7. Keep responses concise, friendly, and on-brand.

        Current Menu:
        ${menuDetails}

        User has ${items.length} items in cart.
      `;

      const rawResponse = await chatWithGemini(`${context}\n\nUser: ${message}`, apiKey);
      
      // Parse tags
      let cleanResponse = rawResponse;
      
      // Handle Recommendation Tag [REC: Item Name]
      const recMatch = rawResponse.match(/\[REC:\s*(.*?)\]/);
      if (recMatch) {
        const itemName = recMatch[1].trim();
        setSearchQuery(itemName); // Filter menu
        cleanResponse = cleanResponse.replace(recMatch[0], '');
        
        // Find product for suggestion state
        const product = products.find(p => p.name.toLowerCase() === itemName.toLowerCase());
        if (product) {
          setSuggestedItem(product);
        }
      }

      // Handle Add to Cart Tag [ADD: Item Name]
      const addMatch = rawResponse.match(/\[ADD:\s*(.*?)\]/);
      if (addMatch) {
        const itemName = addMatch[1].trim();
        const product = products.find(p => p.name.toLowerCase() === itemName.toLowerCase());
        if (product) {
          addItem(product, 'M');
          cleanResponse = cleanResponse.replace(addMatch[0], '');
        } else {
           // Fallback if exact match fails, try partial
           const partialProduct = products.find(p => p.name.toLowerCase().includes(itemName.toLowerCase()));
           if (partialProduct) {
             addItem(partialProduct, 'M');
             cleanResponse = cleanResponse.replace(addMatch[0], '');
           }
        }
        // Clear suggestion if we just added it
        setSuggestedItem(null);
      }

      addMessage({ role: 'assistant', content: cleanResponse.trim() });
      speakResponse(cleanResponse.trim());

    } catch (error) {
      console.error(error);
      addMessage({ role: 'assistant', content: "I'm having trouble connecting to the neural network. Please check your connection." });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    processUserMessage(userMessage);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-[90vw] md:w-[450px] h-[550px] max-h-[80vh] bg-white/60 dark:bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden z-100 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-orange-500/80 to-amber-600/80 backdrop-blur-md flex items-center justify-between shrink-0 shadow-lg z-10">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Aurora Assistant</h3>
                <p className="text-xs text-white/80 font-medium">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button
                onClick={handleClearChat}
                className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-5 h-5" />
              </button>
               <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleChat}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full ml-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Settings Overlay */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-100/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 overflow-hidden shrink-0"
              >
                <div className="p-4 space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gemini API Key
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                      />
                    </div>
                    <button
                      onClick={() => saveApiKey(apiKey)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                      Save
                    </button>
                    {apiKey && (
                      <button
                        onClick={deleteApiKey}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
                        title="Delete API Key"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your key is stored locally in your browser.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-linear-to-b from-transparent to-black/5 dark:to-white/5">
            {messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-sm ${
                    msg.role === 'assistant'
                      ? 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-200/50 dark:border-gray-700/50'
                      : 'bg-linear-to-br from-orange-500 to-amber-600 text-white rounded-tr-none shadow-orange-500/20'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl rounded-tl-none flex gap-2 border border-gray-200/50 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Actions */}
          <AnimatePresence>
            {suggestedItem && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-4 pb-2 flex gap-2 justify-end"
              >
                <button
                  onClick={() => handleSuggestionResponse('no')}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  No thanks
                </button>
                <button
                  onClick={() => handleSuggestionResponse('yes')}
                  className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                >
                  Yes, add it
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-black/60 backdrop-blur-xl shrink-0">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 focus-within:ring-2 focus-within:ring-orange-500/50 focus-within:border-orange-500/50 transition-all flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask Aurora..."}
                  className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 min-w-0"
                />
                {isSupported && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 mr-2 rounded-xl transition-all ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white p-3 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
