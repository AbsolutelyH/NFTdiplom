import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Author.module.css";
import { Banner, NFTCardTwo } from "../../collectionPage/collectionIndex";
import { Brand, Title, Loader } from "../../components/componentsindex";
import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../componentIndex";

//IMPORT SMART CONTRACT DATA
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";

const Author = ({userData}) => {
   const authUserData = useSelector((state) => state.auth?.data?.data?.user);

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [collections, setCollections] = useState(false);
  const [hiden, setHiden] = useState(false);
  // const [like, setLike] = useState(false);
  // const [follower, setFollower] = useState(false);
  // const [following, setFollowing] = useState(false);

  //IMPORT SMART CONTRACT DATA
  const { fetchMyNFTsOrListedNFTs, setError, currentAccount } = useContext(
    NFTDocumentsContext
  );

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myHideNFTs, setHideMyNFTs] = useState([]);

    const type1 = "fetchItemsListed";
    const type2 = "fetchMyNFTs";
    const type3 = "fetchMyHideNFTs";

  useEffect(() => {
    try {
      if(!userData) return;
      fetchMyNFTsOrListedNFTs(type1, userData.walletAdress).then((items) => {
        setNfts(items);
      });
    } catch (erorr){
      setError("Пожалуйста, перезагрузите страницу")
    }
  }, [userData]);

  useEffect(() => {
    try {
      if(!userData) return;
      fetchMyNFTsOrListedNFTs(type2, userData.walletAdress).then((items) => {
        setMyNFTs(items);
      });
    } catch (erorr){
      setError("Пожалуйста, перезагрузите страницу")
    }
  }, [userData]);

  useEffect(() => {
    if(!userData) return;
    try {
      fetchMyNFTsOrListedNFTs(type3, userData.walletAdress).then((items) => {
        setHideMyNFTs(items);
      });
    } catch (erorr){
      setError("Пожалуйста, перезагрузите страницу")
    }
  }, [userData]);

  return (
    <div className={Style.author}>
      {userData?.background ? (
      <Banner bannerImage={`http://localhost:3000${userData.background}`} />
      ) : (
        <Banner bannerImage={images.creatorbackground2} />
      )}
      <AuthorProfileCard userData={userData}/>
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setCollections={setCollections}
        setHiden={setHiden}
        authUserData={authUserData}
        userData={userData}
        // setLike={setLike}
        // setFollower={setFollower}
        // setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        userData={userData}
        collectiables={collectiables}
        created={created}
        collections={collections}
        hiden={hiden}
        nfts={nfts}
        myNFTs={myNFTs}
        myHideNFTs={myHideNFTs}
        currentAccount={currentAccount}
        // like={like}
        // follower={follower}
        // following={following}
      />
      {/* <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      /> */}
      {/* <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div> */}

      {/* <Brand /> */}
    </div>
  );
};

export default Author;