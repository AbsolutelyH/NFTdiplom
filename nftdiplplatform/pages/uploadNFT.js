import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";

//INTERAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

//SMART CONTRACT IMPORT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const uploadNFT = () => {
  const userData = useSelector((state) => state.auth?.data?.data?.user?.walletAdress);
  // console.log(userData)

  const { uploadToIPFS, createNFT, currentAccount } = useContext(NFTDocumentsContext);
  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box}>
        <div className={Style.uploadNFT_box_heading}>
            <h1>Создание NFT</h1>
            <p>
              вы можете выбрать отображаемое имя, создать вашу персональную ссылку 
              и установить другие настройки документа
            </p>
        </div>

        <div className={Style.uploadNFT_box_title}>
          <h2>Изображение</h2>
          <p>
            Поддерживаемые форматы: JPG, PNG. Максимальный размер: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT uploadToIPFS={uploadToIPFS} createNFT={createNFT} userData={userData} />
        </div>
      </div>
    </div>
    )
}

export default uploadNFT;
