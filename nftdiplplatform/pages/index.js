import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, Title, Category } from "../components/componentsindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Title 
        heading="Категории" 
        paragraph="Просматривайте NFT-документы, распределённые по категориям"
      />
      <Category />
    </div>
  );
};

export default Home;