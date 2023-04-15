import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Создавайте и просматривайте NFT документы</h1>
          <p>
            Откройте для себя мир безопасных и удобных NFT-документов
          </p>
          <Button btnName="Начать" handleClick={() => router.push("/searchCollection")} />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;