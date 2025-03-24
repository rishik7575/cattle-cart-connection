
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';
import { Egg, Chicken } from 'lucide-react';

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
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Farm-raised broiler chickens, perfect for roasting. Raised without antibiotics.'
          },
          {
            id: 'eggs-free-range',
            name: 'Free-Range Eggs',
            price: 5.49,
            image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Fresh eggs from free-range hens. Rich in flavor with bright orange yolks.'
          },
          {
            id: 'chicken-whole',
            name: 'Whole Chicken',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Pasture-raised whole chicken, hormone-free and naturally processed.'
          },
          {
            id: 'duck-breast',
            name: 'Duck Breast',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Premium duck breast from our farm-raised Pekin ducks. Rich flavor and tender texture.'
          },
          {
            id: 'chicken-legs',
            name: 'Chicken Legs',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Juicy chicken legs perfect for grilling or baking. From our pasture-raised chickens.'
          },
          {
            id: 'quail-eggs',
            name: 'Fresh Quail Eggs',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1524593656068-76ff79251ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'poultry',
            description: 'Delicate quail eggs with spotted shells. Perfect for gourmet dishes and appetizers.'
          }
        ]);
        setIsLoading(false);
      }, 800);
    };
    
    loadProducts();
  }, []);
  
  // Filter categories
  const categories = ['All', 'Chicken', 'Duck', 'Eggs'];
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
            src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Fresh poultry products"
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Fresh Poultry Products</h1>
            <p className="text-lg text-white/90">
              Explore our selection of high-quality poultry products from our free-range, pasture-raised birds.
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
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-2xl font-semibold">{activeCategory} Poultry Products</h2>
                {activeCategory === 'Chicken' && <Chicken className="h-6 w-6" />}
                {activeCategory === 'Eggs' && <Egg className="h-6 w-6" />}
              </div>
              
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
