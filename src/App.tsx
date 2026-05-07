import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MetaPixelOverride from "@/components/MetaPixelOverride";
import Index from "./pages/Index.tsx";
import Book from "./pages/Book.tsx";
import Test from "./pages/Test.tsx";
import Pages from "./pages/Pages.tsx";
import Settings from "./pages/Settings.tsx";
import Admin from "./pages/Admin.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import FiQuiz from "./pages/FiQuiz.tsx";
import QuizResult from "./pages/QuizResult.tsx";
import JourneyResults from "./pages/JourneyResults.tsx";
import Tools from "./pages/Tools.tsx";
import FireCalculatorPage from "./pages/tools/FireCalculatorPage.tsx";
import CompoundCalculatorPage from "./pages/tools/CompoundCalculatorPage.tsx";
import FourOhOneKCalculatorPage from "./pages/tools/FourOhOneKCalculatorPage.tsx";
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
        <MetaPixelOverride />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<Book />} />
          <Route path="/test" element={<Test />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/quiz" element={<FiQuiz />} />
          <Route path="/quiz/result/:stage" element={<QuizResult />} />
          <Route path="/journeyresults" element={<JourneyResults />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/fire-calculator" element={<FireCalculatorPage />} />
          <Route path="/tools/compound-interest-calculator" element={<CompoundCalculatorPage />} />
          <Route path="/tools/401k-true-cost-calculator" element={<FourOhOneKCalculatorPage />} />
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
