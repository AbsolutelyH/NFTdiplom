import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { 
  CollectionProfile,
  NFTCardTwo, 
} from "../collectionPage/collectionIndex";
import { Slider } from "../components/componentsindex";
import Filter from "../components/Filter/Filter.jsx";

const collection = () => {
  const collectionArray = [
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
    images.nft_image_3,
    images.nft_image_1,
    images.nft_image_2,
  ];
  return (
    <div className={Style.collection}>
      <CollectionProfile NFTData={collectionArray}/>
      <Filter />
      <Slider />
    </div>
  );
};

export default collection;