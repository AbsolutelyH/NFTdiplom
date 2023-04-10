import React, {useEffect, useContext, useState} from "react";
//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { 
  Banner,
  CollectionProfile,
  NFTCardTwo, 
} from "../collectionPage/collectionIndex";
import Filter from "../components/Filter/Filter";
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const Collection = ({collectionData}) => {
    const { fetchMyNFTsOrListedNFTs, setError } = useContext(
        NFTDocumentsContext
      );
    const [nfts, setNfts] = useState([]);
    console.log("Информация о коллекции ",collectionData);
  
      const type1 = "fetchItemsListed";
  
    useEffect(() => {
      try {
        fetchMyNFTsOrListedNFTs(type1, collectionData.walletAdressCreator).then((items) => {
          setNfts(items);
        });
      } catch (erorr){
        setError("Пожалуйста, перезагрузите страницу")
      }
    }, []);
  console.log("NFT: ", nfts);
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      {/* <Filter /> */}
      <NFTCardTwo NFTData={nfts}/>
    </div>
  );
};

export default Collection;