import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Index from "./pages/Index";
import Test from "./pages/Test";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import FireCalculatorPage from "./pages/tools/FireCalculatorPage";
import CompoundCalculatorPage from "./pages/tools/CompoundCalculatorPage";
import ThankYou from "./pages/ThankYou";
import BookThankYou from "./pages/BookThankYou";
import NotFound from "./pages/NotFound";
import { blogPosts } from "./data/blogPosts";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index />, entry: "src/pages/Index.tsx" },
      { path: "test", element: <Test />, entry: "src/pages/Test.tsx" },
      { path: "blog", element: <Blog />, entry: "src/pages/Blog.tsx" },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        entry: "src/pages/BlogPost.tsx",
        getStaticPaths: () => blogPosts.map((p) => `/blog/${p.slug}`),
      },
      { path: "tools", element: <Tools />, entry: "src/pages/Tools.tsx" },
      {
        path: "tools/fire-calculator",
        element: <FireCalculatorPage />,
        entry: "src/pages/tools/FireCalculatorPage.tsx",
      },
      {
        path: "tools/compound-interest-calculator",
        element: <CompoundCalculatorPage />,
        entry: "src/pages/tools/CompoundCalculatorPage.tsx",
      },
      { path: "thank-you", element: <ThankYou />, entry: "src/pages/ThankYou.tsx" },
      { path: "book-thank-you", element: <BookThankYou />, entry: "src/pages/BookThankYou.tsx" },
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];
