
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  // Featured sections
  const featuredSections = [
    {
      title: "Heritage Bees",
      description: "Explore our selection of rare and heritage bee breeds, raised with care and ethical practices.",
      image: "https://images.unsplash.com/photo-1587049633312-d628ae40a0fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      link: "/heritage"
    },
    {
      title: "Premium Honey",
      description: "Discover our selection of premium honey products, including raw, comb, and specialty infused varieties.",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      link: "/honey"
    },
    {
      title: "Beekeeping Supplies",
      description: "Find everything you need for successful beekeeping - from equipment and protective gear to hive maintenance products.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      link: "/needs"
    },
    {
      title: "Honey Production",
      description: "Maximize your honey production with our selection of beekeeping products and essential supplies.",
      image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      link: "/honey"
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587049633312-d628ae40a0fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Honey and beekeeping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">
              HoneyHaven - Premium Bee Farm Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              Experience the finest selection of ethically produced honey and bee-related products 
              for your culinary and beekeeping needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/honey" 
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium inline-flex items-center"
                >
                  Explore Honey
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/heritage" 
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium inline-flex items-center"
                >
                  Heritage Bees
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-semibold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Categories
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredSections.map((section, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-3">{section.title}</h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <Link 
                    to={section.link}
                    className="inline-flex items-center text-black font-medium hover:opacity-80 transition-opacity"
                  >
                    Explore
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-semibold mb-8">What Our Customers Say</h2>
            <blockquote className="text-xl text-gray-600 italic mb-6">
              "The quality of honey and beekeeping products from HoneyHaven has been exceptional. 
              Their commitment to ethical beekeeping practices and customer service sets them apart in the industry."
            </blockquote>
            <p className="font-medium">Sarah M. — Beekeeper</p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">HoneyHaven</h3>
              <p className="text-gray-400">
                Premium honey and bee farm products for your culinary and beekeeping needs.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/heritage" className="text-gray-400 hover:text-white transition-colors">Heritage Bees</Link></li>
                <li><Link to="/honey" className="text-gray-400 hover:text-white transition-colors">Honey Products</Link></li>
                <li><Link to="/needs" className="text-gray-400 hover:text-white transition-colors">Beekeeping Supplies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">Email: info@honeyhaven.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} HoneyHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
