import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Index from "./pages/Index";
import About from "./pages/About";
import Submit from "./pages/Submit";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize theme on mount - default to dark
    const stored = localStorage.getItem("theme");
    const theme = stored || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
