
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

const Poultry = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading products from an API
  useEffect(() => {
    const loadProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts([
          {
            id: 'chicken-broiler',
            name: 'Broiler Chicken',
            price: 15,
            image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Fast-growing meat chicken breed, ready for market in just 6-8 weeks with excellent feed conversion ratio.'
          },
          {
            id: 'chicken-layer',
            name: 'Layer Chicken',
            price: 18,
            image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Productive egg-laying hen that produces up to 300 eggs per year with efficient feed conversion.'
          },
          {
            id: 'duck-pekin',
            name: 'Pekin Duck',
            price: 25,
            image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Fast-growing meat duck with white feathers and orange bills, reaching market weight in just 7-8 weeks.'
          },
          {
            id: 'turkey-broad-breasted',
            name: 'Broad Breasted Turkey',
            price: 45,
            image: 'https://images.unsplash.com/photo-1542558817913-6480352ced6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Large commercial turkey breed with rapid growth rate and excellent meat yield, ideal for large-scale production.'
          },
          {
            id: 'quail-coturnix',
            name: 'Coturnix Quail',
            price: 8,
            image: 'https://images.unsplash.com/photo-1613468583745-8a37ee14ff38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Fast-maturing quail variety that begins laying eggs at 6-8 weeks and produces 300+ eggs annually.'
          },
          {
            id: 'guinea-fowl',
            name: 'Guinea Fowl',
            price: 22,
            image: 'https://images.unsplash.com/photo-1600880200963-11a8a3daf8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Low-maintenance, disease-resistant fowl known for pest control and producing lean, flavorful meat similar to wild game.'
          }
        ]);
        setIsLoading(false);
      }, 800); // Simulate network delay
    };
    
    loadProducts();
  }, []);
  
  // Filter categories if needed
  const categories = ['All', 'Chicken', 'Duck', 'Turkey', 'Quail', 'Guinea Fowl'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.name.toLowerCase().includes(activeCategory.toLowerCase()));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Poultry farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Premium Poultry</h1>
            <p className="text-lg text-white/90">
              Explore our selection of high-quality poultry breeds, including chickens, ducks, turkeys, and more.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 rounded-xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-8">{activeCategory} Poultry</h2>
              
              {filteredProducts.length === 0 ? (
                <p className="text-center py-12 text-gray-500">No products found in this category.</p>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Poultry;
