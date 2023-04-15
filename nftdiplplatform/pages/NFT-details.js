import React, {useEffect, useContext, useState} from "react";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";
import { fetchUserByWal } from "../redux/slices/userByWal";

//IMPORT SMART CONTRACT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTDocumentsContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    creator: "",
    category: "",
    organization: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);


  const [userOwner, setUserOwner] = useState();
  const [userCreator, setUserCreator] = useState();
  const dispatch = useDispatch();

  const nftOwner = nft.owner.toLowerCase();
  const nftCreator = nft.creator.toLowerCase();
  const getDataFirst = async() => {const dataFirst = await dispatch(fetchUserByWal({walletAdress: nftOwner})); setUserOwner(dataFirst?.payload?.data?.user)}
  const getDataSecond = async() => {const dataSecond = await dispatch(fetchUserByWal({walletAdress: nftCreator})); setUserCreator(dataSecond?.payload?.data?.user)}

  useEffect(() => {
    if (!nft) return;
    getDataFirst();
    getDataSecond();
  }, [nft]);
  return (
    <div>
       <NFTDetailsPage nft={nft} userOwner={userOwner} userCreator={userCreator} />
      {/* <Category /> */}
      {/* <Brand /> */}
    </div>
  );
};

export default NFTDetails;