// lib/store.ts

import { create } from 'zustand';
import { Product, CartItem } from '@/src/types';

interface StoreState {
  selectedCategory: string | null;
  products: Product[];
  filteredProducts: Product[];
  cartItems: CartItem[];
  
  setProducts: (products: Product[]) => void;
  setCategories: (categories: string[]) => void;
  setSelectedCategory: (category: string | null) => void;
  filterProductsByCategory: (category: string | null) => void;
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedCategory: null,
  products: [],
  filteredProducts: [],
  cartItems: [],
  
  setProducts: (products) => set({ 
    products,
    filteredProducts: products
  }),
  
  setCategories: (categories) => set({ categories }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  filterProductsByCategory: (category) => 
    set((state) => ({
      selectedCategory: category,
      filteredProducts: category 
        ? state.products.filter(product => product.category === category) 
        : state.products
    })),
  
  addToCart: (productId, quantity) => 
    set((state) => {
      const existingItem = state.cartItems.find(item => item.productId === productId);
      
      if (existingItem) {
        return {
          cartItems: state.cartItems.map(item => 
            item.productId === productId 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        };
      } else {
        return {
          cartItems: [...state.cartItems, { productId, quantity }]
        };
      }
    }),
  
  removeFromCart: (productId) => 
    set((state) => ({
      cartItems: state.cartItems.filter(item => item.productId !== productId)
    })),
  
  updateCartItemQuantity: (productId, quantity) => 
    set((state) => ({
      cartItems: state.cartItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    })),
}));