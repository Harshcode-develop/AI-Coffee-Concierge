# ☕ AuroraBrew: Sip the Spectrum

> **Experience the future of coffee.** AuroraBrew is not just a coffee shop website; it's an immersive, neon-infused digital experience powered by Artificial Intelligence.

## 🌟 Uniqueness & Key Features

AuroraBrew stands out with its seamless blend of modern aesthetics and cutting-edge technology:

- **🎨 Neon-Futuristic Design:** A visually stunning UI featuring glassmorphism, vibrant gradients, and smooth transitions that adapt to Light and Dark modes.
- **🤖 AI Coffee Concierge:** "Aurora," our intelligent assistant, doesn't just chat—she speaks! Powered by Google's **Gemini 1.5 Flash**, she offers personalized recommendations based on your mood and taste.
- **🗣️ Voice Interaction:** Deeply integrated **Text-to-Speech (TTS)** and **Speech-to-Text (STT)** allow you to talk to Aurora and hear her responses naturally.
- **⚡ Silky Smooth UX:** Optimized with `framer-motion` for fluid page transitions, list filtering, and cart interactions.
- **🛒 Smart Cart:** A persistent, non-intrusive cart system with instant feedback and toast notifications.

## 🛠️ Tech Stack

Built with the latest and greatest web technologies for maximum performance and developer experience.

### Core Framework

- **[React 19](https://react.dev/):** The library for web and native user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Strongly typed JavaScript for robust code quality.
- **[Vite](https://vitejs.dev/):** Next-generation frontend tooling for lightning-fast builds.

### Styling & Animation

- **[Tailwind CSS v4](https://tailwindcss.com/):** Utility-first CSS framework (using the latest v4 alpha/beta features).
- **[Framer Motion](https://www.framer.com/motion/):** Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/):** Beautiful, consistent icons.
- **[Clsx](https://github.com/lukeed/clsx) & [Tailwind Merge](https://github.com/dcastil/tailwind-merge):** For dynamic and conflict-free class composition.

### State Management

- **[Zustand](https://github.com/pmndrs/zustand):** A small, fast, and scalable bearbones state-management solution.
  - `useCartStore`: Manages cart items, totals, and persistence.
  - `useChatStore`: Handles chat history and persistence.
  - `useProductStore`: Manages search queries and category filters.
  - `useThemeStore`: Handles light/dark mode preferences.

### AI & APIs

- **[Google Gemini API](https://ai.google.dev/):** Powers the conversational AI using the `gemini-1.5-flash` model for speed and accuracy.
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API):** Native browser API for Speech Recognition and Synthesis (no external keys required).

## 🧩 Key Hooks & Architecture

### `src/hooks/useSpeechToText.ts`

A custom hook that wraps the browser's `SpeechRecognition` API. It handles permission errors, listening states, and returns the transcribed text in real-time.

### `src/services/gemini.ts`

The bridge between the frontend and Google's AI.

- **Model:** Uses `gemini-2.5-flash` for optimal balance of latency and intelligence.
- **Error Handling:** Gracefully manages API connection failures.

### `src/components/AIChat.tsx`

The heart of the AI experience.

- **Context Injection:** We dynamically feed the AI the current menu (products, prices, ingredients) so it never hallucinates items.
- **System Prompt:** "You are Aurora... STRICT RULES..." ensures the AI stays on brand and helpful.
- **Auto-Speech:** Automatically triggers TTS when the AI responds or when the chat is cleared.

## 🚀 Integration Guide: Gemini API

To enable the AI features, you need a Google Gemini API Key.

1.  **Get a Key:** Visit [Google AI Studio](https://aistudio.google.com/) and create a free API key.
2.  **Enter in App:**
    - Open AuroraBrew.
    - Click the **Robot Icon** to open the chat.
    - Click the **Settings (Gear)** icon.
    - Paste your key and click **Save**.
3.  **Security:** The key is stored **locally in your browser's localStorage**. It is never sent to our servers, only directly to Google's API.

## 📦 Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/coffee-shop.git
    cd coffee-shop
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```
