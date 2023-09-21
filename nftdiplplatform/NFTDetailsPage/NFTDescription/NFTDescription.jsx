import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form"; 


//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { NFTTabs } from "../NFTDetailsIndex";

import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";
import { useRouter } from "next/router";
import { fetchOneCollection } from "../../redux/slices/newCollection";

const NFTDescription = ({nft, userCreator, userOwner, creatorPhoto, ownerPhoto}) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);
  const [history, setHistory] = useState(true);
  const [provanance, setProvanance] = useState(false);
  const [owner, setOwner] = useState(false);
  const [collection, setCollection] = useState();
  const dispatch = useDispatch();

  const getCollection = async() => {const data = await dispatch(fetchOneCollection({nameOfcoll: nft.collectionName})); setCollection(data?.payload?.data?.collection);}
  useEffect(() => {
  getCollection();
  }, []);

  console.log(nft);
  const historyArray = [
    images.user1,
    images.user2,
    images.user3,
    images.user4,
    images.user5,
  ];
  const provananceArray = [
    images.user6,
    images.user7,
    images.user8,
    images.user9,
    images.user10,
  ];
  const ownerArray = [
    images.user1,
    images.user8,
    images.user2,
    images.user6,
    images.user5,
  ];

  const openSocial = () => {
    if (!social) {
      setSocial(true);
      setNFTMenu(false);
    } else {
      setSocial(false);
    }
  };

  const openNFTMenu = () => {
    if (!NFTMenu) {
      setNFTMenu(true);
      setSocial(false);
    } else {
      setNFTMenu(false);
    }
  };

  const openTabs = (e) => {
    const btnText = e.target.innerText;

    if (btnText == "Bid History") {
      setHistory(true);
      setProvanance(false);
      setOwner(false);
    } else if (btnText == "Provanance") {
      setHistory(false);
      setProvanance(true);
      setOwner(false);
    }
  };

  const openOwmer = () => {
    if (!owner) {
      setOwner(true);
      setHistory(false);
      setProvanance(false);
    } else {
      setOwner(false);
      setHistory(true);
    }
  };

  //SMART CONTRACT IMPORT
  const {currentAccount, makeHideOrUnhide} = useContext(NFTDocumentsContext);
  const router = useRouter();
  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>{nft.category}</p>
          <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href={nft?.website}>
                  <TiSocialFacebook /> Website
                </a>
                {/* <a href="#">
                  <TiSocialInstagram /> Telegram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> VK
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a> */}
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <MdReportProblem />Сообщить о нарушении
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name} #{nft.tokenId}</h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left}>
            <Link href = {{pathname: "/author", query: userOwner}}>
            <Image
                src={`http://localhost:3000${ownerPhoto}`}
                objectFit="cover"
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              /> 

              </Link>
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Владелец</small> <br />
                <Link href = {{pathname: "/author", query: userOwner}}>
                <span>
                {userOwner?.name} {userOwner?.role == "creator" ?<MdVerified />: <></>}
                </span>
                </Link>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_box_right}>
            <Link href = {{pathname: "/author", query: userCreator}}>
                <Image
                src={`http://localhost:3000${creatorPhoto}`}
                alt="profile"
                objectFit="cover"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              </Link>
              <div className={Style.NFTDescription_box_profile_box_right_info}>
                <small>Создатель</small> <br />
                <Link href = {{pathname: "/author", query: userCreator}}>
                <span>
                  {userCreator?.name} {userCreator?.role == "creator" ?<MdVerified />: <></>}
                </span>
                </Link>
              </div>
            </div>
          </div>

          <div className={Style.NFTDescription_box_profile_biding}>
            {/* <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>22</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>secs</span>
              </div>
            </div> */}
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Кому выдан</small>
                <p>
                  {nft.recipient}
                </p>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Кем выдан</small>
                <p>
                  {nft.author} 
                </p>
                <p>
                  Должность: {nft.authorpost}
                </p>
              </div>
            </div>
            
            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Организация</small>
                <p>
                {nft.organization}
                </p>
              </div>
              {/* <span>[96 in stock]</span> */}
            </div>

            {nft.collectionName != 0 ? <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_collection
                }
              >
                <small>Коллекция</small>
                <p>
                {nft.collectionName}
                </p>
                <div className={Style.NFTDescription_box_collection_left}>
                  <Link href = {{ pathname: "/collection", query: collection}}>
                    {collection?.photo ? <Image
                    src={`http://localhost:3000${collection?.photo}`}
                    alt="profile"
                    objectFit="cover"
                    width={100}
                    height={100}
                    className={Style.NFTDescription_box_collection_image}
                    /> : <Image
                    src={images.doclog}
                    alt="profile"
                    objectFit="cover"
                    width={100}
                    height={100}
                    className={Style.NFTDescription_box_collection_image}
                    />}
                  </Link>
                </div>
              </div>
              {/* <span>[96 in stock]</span> */}
            </div> : <></>}


            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount == nft.owner.toLowerCase() ? (
                <Button
                icon=<FaWallet />
                btnName="Отправить"
                handleClick={() => router.push( `/sentToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                classStyle={Style.button}
              />
              ) : currentAccount == nft.owner.toLowerCase() ? <></> : <p>Подключитесь, чтобы иметь возможность скрыть или отправить NFT, если он принадлежит вам.</p>}
              {(currentAccount == nft.owner.toLowerCase() && nft.hide == "false") ? (
                <Button
                icon=<FaPercentage />
                btnName="Скрыть для других"
                handleClick={() => {makeHideOrUnhide(true, nft.tokenId, userOwner)}}
                classStyle={Style.button}
              />
              ) : (currentAccount == nft.owner.toLowerCase() && nft.hide == "true") ? (
                <Button
                icon=<FaPercentage />
                btnName="Раскрыть для других"
                handleClick={() => {makeHideOrUnhide(false, nft.tokenId, userOwner)}}
                classStyle={Style.button}
              />
              ) : <></>}
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;