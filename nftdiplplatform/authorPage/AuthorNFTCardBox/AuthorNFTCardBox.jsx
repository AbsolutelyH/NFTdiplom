import React, {useEffect, useState, useContext} from "react";
import { useDispatch, useSelector } from "react-redux";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import FollowerTabColl from "../../components/FollowerTab/FollowerTabColl/FollowerTabColl";
import { Loader } from "../../components/componentsindex";
import { fetchMyCollections } from "../../redux/slices/collections";
import { fetchMyNFTs } from "../../redux/slices/allNFTs";

const AuthorNFTCardBox = ({
  userData,
  collectiables,
  created,
  collections,
  hiden,
  // like,
  nfts,
  myNFTs,
  myHideNFTs,
  currentAccount,
  // follower,
  // following,
}) => {
  const [userCollections, setUserCollections] = useState();
  // const [userNFTs, setMyNFTs] = useState();
  React.useEffect(() => {
    if (!userData) return;
    getMyCollections();
    // getMyNFTs();
  }, [userData])
  const dispatch = useDispatch();
  const getMyCollections = async() => {const data = await dispatch(fetchMyCollections({walletAdressCreator: userData.walletAdress})); setUserCollections(data.payload?.data?.mYcollections)}
  // const getMyNFTs = async() => {const nftData = await dispatch(fetchMyNFTs({walletAdressCreator: userData.walletAdress})); setMyNFTs(nftData.payload?.data?.NFTs)}
  // console.log(userNFTs)


  return (
    <div  className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={myNFTs}/>}
      {created && <NFTCardTwo NFTData={nfts}/>}
      {collections && (
        <div className={Style.searchPage_box}> 
        {userCollections.map((obj) => <FollowerTabColl el={obj} back={obj.background}/>)}
      </div>
      )}
      {(hiden && currentAccount == userData?.walletAdress) && <NFTCardTwo NFTData={myHideNFTs}/>}
      {/* {like && <NFTCardTwo NFTData={nfts} />} */}
      {/* {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AuthorNFTCardBox;