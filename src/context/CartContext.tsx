
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Initialize from localStorage if available
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update item count and total
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
    
    const cartTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setTotal(cartTotal);
  }, [items]);
  
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);
  
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists in cart, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        toast.success(`Added another ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Product doesn't exist in cart, add new item
        toast.success(`${product.name} added to your cart`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.product.id !== productId);
      toast.info('Item removed from cart');
      return updatedItems;
    });
  };
  
  const increaseQuantity = (productId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };
  
  const decreaseQuantity = (productId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.info('Cart has been cleared');
  };
  
  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      toggleCart,
      closeCart,
      openCart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
