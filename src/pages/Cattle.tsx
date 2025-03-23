
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/context/CartContext';

const Cattle = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading products from an API
  useEffect(() => {
    const loadProducts = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        setProducts([
          {
            id: 'cow-holstein',
            name: 'Holstein Cow',
            price: 1200,
            image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'A high-yielding dairy cow breed known for impressive milk production and distinctive black and white markings.'
          },
          {
            id: 'cow-jersey',
            name: 'Jersey Cow',
            price: 1500,
            image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'Known for producing milk with high butterfat content, this breed is adaptable and efficient.'
          },
          {
            id: 'buffalo-murrah',
            name: 'Murrah Buffalo',
            price: 1800,
            image: 'https://images.unsplash.com/photo-1598715474792-47dcbf3c9306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'A premium buffalo breed known for high milk yield with excellent fat content, perfect for dairy farming.'
          },
          {
            id: 'goat-saanen',
            name: 'Saanen Goat',
            price: 350,
            image: 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'A Swiss dairy goat breed known for its high milk production and docile temperament.'
          },
          {
            id: 'cow-angus',
            name: 'Angus Cow',
            price: 1600,
            image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'A beef cattle breed known for producing high-quality, well-marbled meat with excellent taste.'
          },
          {
            id: 'goat-boer',
            name: 'Boer Goat',
            price: 450,
            image: 'https://images.unsplash.com/photo-1524764517448-b7e78dcb1a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'cattle',
            description: 'A meat goat breed with fast growth rates and excellent meat quality, highly adaptable to various climates.'
          }
        ]);
        setIsLoading(false);
      }, 800); // Simulate network delay
    };
    
    loadProducts();
  }, []);
  
  // Filter categories if needed
  const categories = ['All', 'Cow', 'Buffalo', 'Goat'];
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
            src="https://images.unsplash.com/photo-1566126003133-3f5974b4638f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Cattle grazing in field"
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
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">Premium Cattle</h1>
            <p className="text-lg text-white/90">
              Explore our selection of high-quality cattle breeds, including cows, buffaloes, and goats.
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
              <h2 className="text-2xl font-semibold mb-8">{activeCategory} Cattle</h2>
              
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

export default Cattle;
