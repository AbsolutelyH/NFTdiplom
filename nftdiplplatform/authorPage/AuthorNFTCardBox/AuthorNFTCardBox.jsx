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

const AuthorNFTCardBox = ({
  userData,
  collectiables,
  created,
  collections,
  // like,
  nfts,
  myNFTs,
  // follower,
  // following,
}) => {

  const [userCollections, setUserCollections] = useState();
  // const userData = useSelector((state) => state.auth.data?.data?.user);
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

  // const likeArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  const followingArray = [
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
  ];
  return (
    <div  className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo NFTData={myNFTs}/>}
      {created && <NFTCardTwo NFTData={nfts}/>}
      {collections && (
        <div className={Style.searchPage_box}> 
        {userCollections.map((obj) => <FollowerTabColl el={obj} back={obj.background}/>)}
      </div>
      )}
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