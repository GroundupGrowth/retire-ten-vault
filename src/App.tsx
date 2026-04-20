import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Tools from "./pages/Tools.tsx";
import FireCalculatorPage from "./pages/tools/FireCalculatorPage.tsx";
import CompoundCalculatorPage from "./pages/tools/CompoundCalculatorPage.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import BookThankYou from "./pages/BookThankYou.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/fire-calculator" element={<FireCalculatorPage />} />
          <Route path="/tools/compound-interest-calculator" element={<CompoundCalculatorPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/book-thank-you" element={<BookThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
