import React from "react";
import {NavBar} from "../components/layout/NavBar";
import {HeroSection} from "../components/layout/HeroSection";
import {Footer} from "../components/layout/Footer";

const App = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default App;