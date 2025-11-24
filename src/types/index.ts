export interface Ingredient {
  name: string;
  amount: string; // e.g. "20mg", "10g"
}

export type Category = 'Coffee' | 'Tea' | 'Sandwiches' | 'Desserts';

export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: Ingredient[];
  rating: number;
  reviews: number;
  tags: string[]; // e.g. "Hot", "Cold", "Sweet"
  category: Category;
}

export interface CartItem extends Coffee {
  quantity: number;
  size: 'S' | 'M' | 'L';
}

export type Theme = 'light' | 'dark' | 'system';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
