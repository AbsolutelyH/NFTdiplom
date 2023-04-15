import React, {useEffect, useState, useContext} from "react";
import { useDispatch, useSelector } from "react-redux";

//INTRNAL IMPORT
import Style from "../styles/searchCollection.module.css";
//import { Slider, Brand } from "../components/componentsindex";
import { SearchColl } from "../SearchCollection/searchCollIndex";
import { Filter } from "../components/componentsindex";
import FollowerTabColl from "../components/FollowerTab/FollowerTabColl/FollowerTabColl"
import axios from "../redux/axios";
import {Loader} from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
import { fetchCollections } from "../redux/slices/collections";

const searchCollection = () => {
  const [collectionsObj, setCollectionsObj] = useState([]);
  React.useEffect(() => {
    dispatch(fetchCollections());
  }, [])
  const dispatch = useDispatch();
  const {collections} = useSelector((state) => state.collections);
  const collectionsCopy = (collections.items?.data?.collections);
  console.log(collectionsCopy)
  const isLoading = collections.status == 'loading';

  const onHandleSearch = (value) => {
    const filteredCollections = collectionsObj.filter(({nameOfcoll}) =>
    nameOfcoll.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredCollections.length === 0) {
      setCollectionsObj(collectionsCopy);
    } else {
      setCollectionsObj(filteredCollections);
    }
  };

  const onClearSearch = () => {
    if (collectionsObj?.length && collectionsCopy?.length) {
      setCollectionsObj(collectionsCopy);
    }
  };
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchColl
              onHandleSearch={onHandleSearch}
              onClearSearch={onClearSearch}
      />
      {isLoading ? <Loader/> : collectionsObj.length != 0 ?(
        <div className={Style.searchPage_box}> 
          {collectionsObj?.map((obj) => <FollowerTabColl el={obj} back={obj.background}/>)}
        </div>) : (
          <div className={Style.searchPage_box}> 
            {collectionsCopy?.map((obj) => <FollowerTabColl el={obj} back={obj.background}/>)}
          </div>)
        }
   
    </div>
  );
};

export default searchCollection;