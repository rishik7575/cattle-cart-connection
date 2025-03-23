
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

const Needs = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading products from an API
  useEffect(() => {
    const loadProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts([
          {
            id: 'feed-premium',
            name: 'Premium Cattle Feed',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'High-quality mixed feed formulated for optimal cattle nutrition and health.'
          },
          {
            id: 'milking-machine',
            name: 'Portable Milking Machine',
            price: 899.99,
            image: 'https://images.unsplash.com/photo-1597824243857-15466d0122c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'Efficient and easy-to-use milking machine suitable for small to medium dairy operations.'
          },
          {
            id: 'cattle-brush',
            name: 'Automatic Cattle Brush',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'Self-activated brush that helps maintain cattle hygiene and reduces stress.'
          },
          {
            id: 'feeding-trough',
            name: 'Cattle Feeding Trough',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1500595046743-cd271d694e30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'Durable, easy-to-clean feeding trough designed for efficient cattle feeding.'
          },
          {
            id: 'dairy-chemicals',
            name: 'Dairy Cleaning Solutions Set',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1580256081112-e49377338b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'Complete set of cleaning and sanitizing solutions for dairy equipment.'
          },
          {
            id: 'cattle-monitoring',
            name: 'Smart Cattle Monitoring System',
            price: 349.99,
            image: 'https://images.unsplash.com/photo-1553376397-3765e4e8e8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'needs',
            description: 'IoT-based monitoring system to track cattle health, location, and activity.'
          }
        ]);
        setIsLoading(false);
      }, 800);
    };
    
    loadProducts();
  }, []);
  
  // Filter categories
  const categories = ['All', 'Equipment', 'Feed', 'Health', 'Maintenance'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => 
      product.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      product.description.toLowerCase().includes(activeCategory.toLowerCase())
    );
  
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
            src="https://images.unsplash.com/photo-1509115046493-d2621e0e1504?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Farm equipment"
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Farming Needs</h1>
            <p className="text-lg text-white/90">
              Everything you need for successful cattle raising and dairy production.
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
              <h2 className="text-2xl font-semibold mb-8">{activeCategory} Products</h2>
              
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

export default Needs;
