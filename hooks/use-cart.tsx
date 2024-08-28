import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware'; 

import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    totalItems: 0,
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        // Increment quantity if item exists
        const updatedItems = currentItems.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({
          items: updatedItems,
          totalItems: get().totalItems + 1, // Increase totalItems by 1
        });
        toast.success('Increased item quantity.');
      } else {
        // Add new item with quantity 1
        set({
          items: [...currentItems, { ...data, quantity: 1 }],
          totalItems: get().totalItems + 1, // Increase totalItems by 1
        });
        toast.success('Item added to cart.');
      }
    },
    removeItem: (id: string) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === id);

      if (existingItem) {
        let updatedItems;

        if (existingItem.quantity > 1) {
          // Decrease quantity if more than 1
          updatedItems = currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({
            items: updatedItems,
            totalItems: Math.max(get().totalItems - 1, 0), // Decrease totalItems by 1, ensuring it never goes below 0
          });
          toast.success('Decreased item quantity.');
        } else {
          // Remove item if quantity is 1 or less
          updatedItems = currentItems.filter((item) => item.id !== id);
          set({
            items: updatedItems,
            totalItems: Math.max(get().totalItems - 1, 0), // Decrease totalItems by 1, ensuring it never goes below 0
          });
          toast.success('Item removed from cart.');
        }
      }
    },
    removeAll: () => set({ items: [], totalItems: 0 }), // Reset both items and totalItems
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  })
);

export default useCart;
