
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Honey = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');

  // Define honey products
  const products = [
    {
      id: 'raw-wildflower',
      name: 'Raw Wildflower Honey',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1587049633312-d628ae40a0fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Raw',
      description: 'Pure, unfiltered wildflower honey with rich floral notes. Harvested from diverse wildflower meadows.'
    },
    {
      id: 'raw-clover',
      name: 'Clover Honey',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Raw',
      description: 'Mild, sweet clover honey with a light amber color and smooth texture. Perfect for everyday use.'
    },
    {
      id: 'honeycomb',
      name: 'Fresh Honeycomb',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Comb',
      description: 'Pure, natural honeycomb straight from the hive. A delicious treat for honey enthusiasts.'
    },
    {
      id: 'infused-lavender',
      name: 'Lavender Infused Honey',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1556682851-c4918e9a2bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Infused',
      description: 'Fragrant honey infused with organic lavender. Perfect for teas, desserts, and cheese pairings.'
    },
    {
      id: 'raw-manuka',
      name: 'Manuka Honey',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Raw',
      description: 'Premium Manuka honey known for its unique properties and rich, distinctive flavor.'
    },
    {
      id: 'infused-cinnamon',
      name: 'Cinnamon Infused Honey',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1612171709946-df7569cc0aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Infused',
      description: 'Warm honey infused with Ceylon cinnamon. Delicious in coffee, tea, or drizzled on toast.'
    }
  ];

  // Filter categories
  const categories = ['All', 'Raw', 'Comb', 'Infused'];

  // Filter products by category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587049633312-d628ae40a0fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Honey jars with honeycomb"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">
              Honey Products
            </h1>
            <p className="text-lg opacity-90">
              Explore our selection of premium honey products, from raw honey to honeycomb and more.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8">
            {activeCategory === 'All' ? 'All Honey Products' : `${activeCategory} Honey`}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute right-4 bottom-4 p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors"
                    aria-label="Quick add to cart"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 px-4 bg-amber-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Honey;
