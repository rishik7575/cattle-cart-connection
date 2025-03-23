
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart, Product } from '@/context/CartContext';
import { ShoppingCart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };
  
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image" 
          loading="lazy"
        />
        
        {/* Quick add button (appears on hover) */}
        <motion.button
          className="absolute right-4 bottom-4 z-10 bg-white rounded-full p-2 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <Plus size={18} />
        </motion.button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <motion.button
          className="w-full py-2.5 px-4 flex items-center justify-center gap-2 bg-black text-white rounded-lg transition-colors hover:bg-gray-900"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          animate={isAdding ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
