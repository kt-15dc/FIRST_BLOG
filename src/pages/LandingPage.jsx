import React, { use } from "react";
import { NavBar } from "../components/layout/NavBar";
import { HeroSection } from "../components/layout/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleSection } from "../components/layout/ArticleSection";
import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {

  const [placeArray, setPlaceArray] = useState([]);

  const fetchData = async (category = "Highlight") => {
    const response = await axios.get(`https://blog-post-project-api.vercel.app/posts`, {
      params: { category: category === "Highlight" ? undefined : category },
    });
    const placeArray = response.data.posts;
    setPlaceArray(placeArray);
  };
  console.log(placeArray);

  useEffect(()=> {
    fetchData()
},[])

  return (
  <div>
    <NavBar />
    <HeroSection />

    <ArticleSection article={placeArray} fetchData={fetchData} />
    <Footer />
  </div>
  );
};

export default App;