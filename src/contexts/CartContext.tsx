
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from '@/components/ui/sonner';

interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
};

const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') return initialState;
  
  try {
    const storedCart = localStorage.getItem('ecommerceCart');
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return initialState;
  }
};

const calculateCartTotals = (items: CartItem[]): { itemCount: number; total: number } => {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    itemCount,
    total: parseFloat(total.toFixed(2)),
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { payload, quantity = 1 } = action;
      const existingItemIndex = state.items.findIndex(item => item.id === payload.id);
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        newItems = [...state.items, { ...payload, quantity }];
      }
      
      const { itemCount, total } = calculateCartTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { itemCount, total } = calculateCartTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const newItems = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const { itemCount, total } = calculateCartTotals(newItems);
      
      return {
        ...state,
        items: newItems,
        itemCount,
        total,
      };
    }

    case 'CLEAR_CART': {
      return {
        ...initialState,
      };
    }
    
    default:
      return state;
  }
};

interface CartContextProps {
  cart: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ecommerceCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: product, quantity });
    toast.success(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
