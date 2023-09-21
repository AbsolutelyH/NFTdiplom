import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

//INTERNAL IMPORT
import Style from "./collectionProfile.module.css";
import { Button } from "../../components/componentsindex.js";
import images from "../../img";

const collectionProfile = ({collectionData}) => {
  const authUserData = useSelector((state) => state.auth?.data?.data?.user);
  const router = useRouter();
  const cardArray = [];
  return (
    <div className={Style.collectionProfile}>
      <div className={Style.collectionProfile_box}>
        <div className={Style.collectionProfile_box_left}>
          {collectionData?.photo ? <Image
            src={`http://localhost:3000${collectionData?.photo}`}
            alt="nft image"
            width={800}
            height={800}
            className={Style.collectionProfile_box_left_img}
          /> : <Image
          src={images.doclog}
          alt="nft image"
          width={800}
          height={800}
          className={Style.collectionProfile_box_left_img}
        />}

          {/* <div className={Style.collectionProfile_box_left_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div> */}
        </div>

        <div className={Style.collectionProfile_box_middle}>
          <h1>
            {collectionData?.nameOfcoll}
            {authUserData?.walletAdress == collectionData?.walletAdressCreator ? 
            <Button
              type="submit"
              btnName="Редактировать коллекцию"
              handleClick={() => router.push({ pathname: "/editCollectionPage", query: collectionData})}
              classStyle={Style.button}
            /> : <></>}
          </h1>
          <p>
          {collectionData?.about}
          </p>

          <div className={Style.collectionProfile_box_middle_box}>
            {cardArray.map((el, i) => (
              <div
                className={Style.collectionProfile_box_middle_box_item}
                key={i + 1}
              >
                <small>Floor price</small>
                <p>${i + 1}95,4683</p>
                <span>+ {i + 2}.11%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default collectionProfile;