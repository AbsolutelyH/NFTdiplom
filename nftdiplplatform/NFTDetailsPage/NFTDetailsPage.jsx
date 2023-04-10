import React, { useState, useContext, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";
import { fetchUserByWal } from "../redux/slices/userByWal";

const NFTDetailsPage = ({nft, userCreator, userOwner}) => {
  // const [userOwner, setUserOwner] = useState();
  // const [userCreator, setUserCreator] = useState();

  // const router = useRouter();
  // const dispatch = useDispatch();

  // const nftOwner = nft.owner.toLowerCase();
  // const nftCreator = nft.creator.toLowerCase();
  // const getDataFirst = async() => {const dataFirst = await dispatch(fetchUserByWal({walletAdress: nftOwner})); setUserOwner(dataFirst?.payload?.data?.user)}
  // const getDataSecond = async() => {const dataSecond = await dispatch(fetchUserByWal({walletAdress: nftCreator})); setUserCreator(dataSecond?.payload?.data?.user)}

  // console.log(userOwner);
  // console.log(userCreator);

  // useEffect(() => {
  //   if (!nft) return;
  //   getDataFirst();
  //   getDataSecond();
  // }, [nft]);
  const ownerPhoto = userOwner?.photo;
  const creatorPhoto = userCreator?.photo;
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        {ownerPhoto && creatorPhoto ? <NFTDescription nft={nft} userOwner={userOwner} userCreator={userCreator} ownerPhoto={ownerPhoto} creatorPhoto={creatorPhoto}/> : <></>}
      </div>
    </div>
  );
};

export default NFTDetailsPage;