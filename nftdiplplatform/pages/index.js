import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, Title, Category } from "../components/componentsindex";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext)
  useEffect(()=> {
    checkIfWalletConnected()
  }, []);
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