import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title, Loader } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

//IMPORT SMART CONTRACT DATA
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const Author = ({userData}) => {
  // const userData = useSelector((state) => state.userByWal?.data);


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
  // console.log(userData.walletAdress);

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  //IMPORT SMART CONTRACT DATA
  const { fetchMyNFTsOrListedNFTs, setError } = useContext(
    NFTDocumentsContext
  );

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  console.log(userData);

    const type1 = "fetchItemsListed";
    const type2 = "fetchMyNFTs";

  useEffect(() => {
    try {
      fetchMyNFTsOrListedNFTs(type1, userData.walletAdress).then((items) => {
        setNfts(items);
      });
    } catch (erorr){
      setError("Пожалуйста, перезагрузите страницу")
    }
  }, []);

  useEffect(() => {
    try {
      fetchMyNFTsOrListedNFTs(type2, userData.walletAdress).then((items) => {
        setMyNFTs(items);
      });
    } catch (erorr){
      setError("Пожалуйста, перезагрузите страницу")
    }
  }, []);


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
        // setLike={setLike}
        // setFollower={setFollower}
        // setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        nfts={nfts}
        myNFTs={myNFTs}
        // follower={follower}
        // following={following}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
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