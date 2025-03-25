
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Cattle from "./pages/Cattle";
import Dairy from "./pages/Dairy";
import Needs from "./pages/Needs";
import Poultry from "./pages/Poultry";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Cart from "./components/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <div className="min-h-screen">
            <Header />
            <Cart />
            <div className="pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cattle" element={<Cattle />} />
                <Route path="/dairy" element={<Dairy />} />
                <Route path="/needs" element={<Needs />} />
                <Route path="/poultry" element={<Poultry />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
