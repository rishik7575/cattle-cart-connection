
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { 
    isOpen, 
    closeCart, 
    items, 
    total,
    clearCart,
    itemCount
  } = useCart();
  
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const cartVariants = {
    hidden: { 
      x: '100%',
      opacity: 0,
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    exit: { 
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={closeCart}
          />
          
          {/* Cart Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cartVariants}
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <h2 className="text-xl font-medium">Your Cart</h2>
                <span className="text-sm text-gray-500">({itemCount} items)</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-gray-500 hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Cart Content */}
            {items.length > 0 ? (
              <>
                <div className="flex-1 overflow-y-auto py-4 px-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* Cart Footer */}
                <div className="border-t px-6 py-4 space-y-4">
                  {/* Clear Cart Button */}
                  <button
                    onClick={clearCart}
                    className="w-full flex items-center justify-center gap-2 py-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Clear Cart</span>
                  </button>
                  
                  {/* Total */}
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {/* Checkout Button */}
                  <motion.button
                    className="w-full py-3 bg-black text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Checkout
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some products to your cart and they will appear here</p>
                <motion.button
                  onClick={closeCart}
                  className="px-6 py-2 bg-black text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
