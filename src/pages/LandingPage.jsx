import React from "react";
import { NavBar } from "../components/layout/NavBar";
import { HeroSection } from "../components/layout/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleSection } from "../components/layout/ArticleSection";

const App = () => (
  <div>
    <NavBar />
    <HeroSection />
    <ArticleSection />
    <Footer />
  </div>
);

export default App;