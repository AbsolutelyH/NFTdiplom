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
    const [colNfts, setColNfts] = useState([]);
    // console.log("Информация о коллекции ",collectionData);
  
      const type1 = "fetchItemsListed";
    
    const setCollectionNFTs = (nfts) => {
      const items = nfts.filter(el => el.collectionName == collectionData.nameOfcoll);
      // console.log("фильтрованный", items);
      setColNfts(items);
    }
    
    useEffect(() => {
      try {
        if(!collectionData) return;
        fetchMyNFTsOrListedNFTs(type1, collectionData?.walletAdressCreator).then((items) => {
          setNfts(items);
        });
      } catch (erorr){
        setError("Пожалуйста, перезагрузите страницу")
      }
    }, [collectionData]);
    useEffect(() => {
      try {
        if(!nfts) return;
        setCollectionNFTs(nfts);
      } catch (erorr){
        setError("Пожалуйста, перезагрузите страницу")
      }
    }, [nfts]);
    // console.log("colNfts", colNfts);
  // console.log("NFT: ", nfts);
  return (
    <div className={Style.collection}>
      {collectionData?.background ? (
      <Banner bannerImage={`http://localhost:3000${collectionData.background}`} />
      ) : (
        <Banner bannerImage={images.creatorbackground2} />
      )}
      <CollectionProfile collectionData={collectionData}/>
      {/* <Filter /> */}
      <NFTCardTwo NFTData={colNfts}/>
    </div>
  );
};

export default Collection;