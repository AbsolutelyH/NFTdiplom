import React, { useEffect, useState, useContext } from "react";

//INTERAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

const uploadNFT = () => {
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
          <h2>Изображения, Видео, Аудио</h2>
          <p>
            Поддерживаемые форматы: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Максимальный размер: 100 MB
          </p>
        </div>

        <div className={Style.uploadNFT_box_form}>
          <UploadNFT />
        </div>
      </div>
    </div>
    )
}

export default uploadNFT;
