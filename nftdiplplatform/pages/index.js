import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, Title, Category } from "../components/componentsindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Title heading="Browse by category" paragraph="Explore the NFTs in the most featured categories."/>
      <Category />
    </div>
  );
};

export default Home;