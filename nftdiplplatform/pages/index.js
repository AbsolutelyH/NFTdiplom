import React, { useContext, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection, Title, Category, Collection, FollowerTab} from "../components/componentsindex";
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTDocumentsContext)
  useEffect(()=> {
    checkIfWalletConnected()
  }, []);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <FollowerTab />
      {/* <Title 
        heading="Категории" 
        paragraph="Просматривайте NFT-документы, распределённые по категориям"
      /> */}
      {/* <Category /> */}
    </div>
  );
};

export default Home;