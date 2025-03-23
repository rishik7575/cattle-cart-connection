
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

const Dairy = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading products from an API
  useEffect(() => {
    const loadProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts([
          {
            id: 'milk-whole',
            name: 'Fresh Whole Milk',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Farm-fresh whole milk with rich, creamy taste. Sourced from our grass-fed cattle.'
          },
          {
            id: 'cheese-cheddar',
            name: 'Aged Cheddar Cheese',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Sharp, aged cheddar cheese made using traditional methods. Perfect for sandwiches and snacking.'
          },
          {
            id: 'butter-premium',
            name: 'Premium Butter',
            price: 4.50,
            image: 'https://images.unsplash.com/photo-1589985270917-bf51be7e11df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Creamy, farm-fresh butter with rich flavor. Made from high-quality cream from our dairy cows.'
          },
          {
            id: 'yogurt-plain',
            name: 'Natural Yogurt',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Smooth, creamy yogurt with live cultures. Made from our fresh whole milk.'
          },
          {
            id: 'cream-heavy',
            name: 'Fresh Heavy Cream',
            price: 4.25,
            image: 'https://images.unsplash.com/photo-1603356033288-acfcb54801e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Rich, thick heavy cream perfect for cooking, baking, and whipping. Farm-fresh quality.'
          },
          {
            id: 'ghee-premium',
            name: 'Premium Clarified Butter (Ghee)',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1612773834139-a59cfd6eded9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'dairy',
            description: 'Pure, golden clarified butter with a rich, nutty flavor. Ideal for high-heat cooking.'
          }
        ]);
        setIsLoading(false);
      }, 800);
    };
    
    loadProducts();
  }, []);
  
  // Filter categories
  const categories = ['All', 'Milk', 'Cheese', 'Butter', 'Yogurt'];
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
            src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Fresh dairy products"
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Fresh Dairy Products</h1>
            <p className="text-lg text-white/90">
              Explore our selection of high-quality dairy products made from the milk of our pasture-raised cattle.
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
              <h2 className="text-2xl font-semibold mb-8">{activeCategory} Dairy Products</h2>
              
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

export default Dairy;
