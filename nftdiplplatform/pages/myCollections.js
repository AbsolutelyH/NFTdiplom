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
import { fetchMyCollections } from "../redux/slices/collections";

const myCollections = () => {
  const [userCollections, setUserCollections] = useState();
  const userData = useSelector((state) => state.auth.data?.data?.user);
  // const [collectionsObj, setCollectionsObj] = useState([]);
  React.useEffect(() => {
    if (!userData) return;
    getMyCollections();
  }, [userData])
  const dispatch = useDispatch();
  const getMyCollections = async() => {const data = await dispatch(fetchMyCollections({walletAdressCreator: userData.walletAdress})); setUserCollections(data.payload?.data?.mYcollections); console.log(data)}
  // const {collections} = useSelector((state) => state.collections?.items?.data?.collections);
  // const collectionsCopy = (collections.items?.data?.collections);
  console.log(userCollections)
  // const isLoading = collections.status == 'loading';

//   const onHandleSearch = (value) => {
//     const filteredCollections = collectionsObj.filter(({nameOfcoll}) =>
//     nameOfcoll.toLowerCase().includes(value.toLowerCase())
//     );

//     if (filteredCollections.length === 0) {
//       setCollectionsObj(collectionsCopy);
//     } else {
//       setCollectionsObj(filteredCollections);
//     }
//   };

//   const onClearSearch = () => {
//     if (collectionsObj?.length && collectionsCopy?.length) {
//       setCollectionsObj(collectionsCopy);
//     }
//   };
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      {/* <SearchColl
              onHandleSearch={onHandleSearch}
              onClearSearch={onClearSearch}
      /> */}
      {!userCollections ? <Loader/> : (
        <div className={Style.searchPage_box}> 
          {userCollections.map((obj) => <FollowerTabColl el={obj} back={obj.background}/>)}
        </div>)
        }
    </div>
  );
};

export default myCollections;