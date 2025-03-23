
import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { product, quantity } = item;
  
  return (
    <motion.div 
      className="flex py-4 border-b last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Product Image */}
      <div className="h-20 w-20 bg-gray-100 rounded-md overflow-hidden mr-4 flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h4 className="font-medium text-sm sm:text-base truncate">{product.name}</h4>
          <button 
            onClick={() => removeFromCart(product.id)}
            className="text-gray-400 hover:text-red-500 p-1 -m-1"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm my-1">${product.price.toFixed(2)}</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center mt-2">
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          
          <span className="w-10 text-center font-medium text-sm">{quantity}</span>
          
          <button
            onClick={() => increaseQuantity(product.id)}
            className="w-8 h-8 flex items-center justify-center border rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
          
          <div className="ml-auto font-medium">
            ${(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
