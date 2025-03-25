
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bird, Filter } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// Type for poultry products
interface PoultryProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

// Mock fetch function for poultry products
const fetchPoultryProducts = async (): Promise<PoultryProduct[]> => {
  // Simulate API call
  return [
    {
      id: "1",
      name: "Fresh Eggs",
      price: 5.99,
      category: "eggs",
      image: "/placeholder.svg",
      description: "Farm fresh eggs from free-range chickens"
    },
    {
      id: "2",
      name: "Whole Chicken",
      price: 12.99,
      category: "meat",
      image: "/placeholder.svg",
      description: "Free-range whole chicken"
    },
    {
      id: "3",
      name: "Chicken Breast",
      price: 8.99,
      category: "meat",
      image: "/placeholder.svg",
      description: "Boneless, skinless chicken breast"
    },
    {
      id: "4",
      name: "Chicken Thighs",
      price: 7.49,
      category: "meat",
      image: "/placeholder.svg",
      description: "Juicy chicken thighs"
    },
    {
      id: "5",
      name: "Duck Eggs",
      price: 8.99,
      category: "eggs",
      image: "/placeholder.svg",
      description: "Farm fresh duck eggs"
    },
    {
      id: "6",
      name: "Quail Eggs",
      price: 9.99,
      category: "eggs",
      image: "/placeholder.svg",
      description: "Small but nutritious quail eggs"
    },
    {
      id: "7",
      name: "Duck Breast",
      price: 14.99,
      category: "meat",
      image: "/placeholder.svg",
      description: "Premium duck breast"
    },
    {
      id: "8",
      name: "Organic Chicken Feed",
      price: 19.99,
      category: "supplies",
      image: "/placeholder.svg",
      description: "Organic feed for chickens"
    }
  ];
};

const Poultry = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['poultryProducts'],
    queryFn: fetchPoultryProducts
  });
  
  const filteredProducts = filter 
    ? products.filter(product => product.category === filter) 
    : products;
  
  const handleAddToCart = (product: PoultryProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description
    });
    toast(`Added ${product.name} to cart`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Poultry Products</h1>
            <div className="flex justify-center mb-4">
              <Bird size={32} className="text-gray-800" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of farm-fresh poultry products, from premium eggs to high-quality meat.
              All of our products are ethically and sustainably raised.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <Filter className="mr-2" />
          <h2 className="text-xl font-semibold">Filter Products</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={filter === "eggs" ? "default" : "outline"} 
            onClick={() => setFilter("eggs")}
          >
            Eggs
          </Button>
          <Button 
            variant={filter === "meat" ? "default" : "outline"} 
            onClick={() => setFilter("meat")}
          >
            Meat
          </Button>
          <Button 
            variant={filter === "supplies" ? "default" : "outline"} 
            onClick={() => setFilter("supplies")}
          >
            Supplies
          </Button>
        </div>
      </section>
      
      {/* Products Grid */}
      <section>
        {isLoading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">Error loading products</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="h-full flex flex-col">
                <div className="aspect-square relative bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="flex-grow py-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Poultry;
