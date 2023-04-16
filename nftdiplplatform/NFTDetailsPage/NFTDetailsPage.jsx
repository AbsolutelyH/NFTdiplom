import React, { useState, useContext, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";
import { fetchUserByWal } from "../redux/slices/userByWal";

const NFTDetailsPage = ({nft, userCreator, userOwner}) => {
  // const ownerPhoto = userOwner?.photo;
  // const creatorPhoto = userCreator?.photo;
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        {userOwner?.photo && userCreator?.photo ? <NFTDescription nft={nft} userOwner={userOwner} userCreator={userCreator} ownerPhoto={userOwner?.photo} creatorPhoto={userCreator?.photo}/> : <></>}
      </div>
    </div>
  );
};

export default NFTDetailsPage;