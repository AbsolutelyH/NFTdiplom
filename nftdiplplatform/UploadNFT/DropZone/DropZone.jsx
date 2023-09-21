import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTERAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  collectionName,
  title, 
  heading, 
  subHeading,
  name,
  author,
  authorpost,
  organization,
  recipient,
  website,
  description,
  //royalties,
  //fileSize,
  category,
  //properties,
  uploadToIPFS,
  setImage,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    // console.log(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  return (
    <div className={Style.DropZone}>
      {!fileUrl ? <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div> : <></>}

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image 
              src={fileUrl} 
              alt="nft image" 
              width={200} 
              height={200} 
            />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <samp>НАЗВАНИЕ NFT:</samp>
                  {name || ""}
                </p>
                <p>
                  <samp>Website:</samp>
                  {website || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_two}>
                <p>
                  <span>Автор</span>
                  {author || ""}
                </p>
                <p>
                  <span>Должность</span>
                  {authorpost || ""}
                </p>
                <p>
                  <span>Организация</span>
                  {organization || ""}
                </p>
                <p>
                  <span>Получатель</span>
                  {recipient || ""}
                </p>
                <p>
                  <span>Описание</span>
                  {description || ""}
                </p>
              </div>

              <div className={Style.DropZone_box_aside_box_preview_three}>
                {/* <p>
                  <span>Royalties</span>
                  {royalties || ""}
                </p>
                <p>
                  <span>FileSize</span>
                  {fileSize || ""}
                </p> */}
                {/* <p>
                  <span>Properties</span>
                  {properties || ""}
                </p> */}
                <p>
                  <span>Категория</span>
                  {category || ""}
                </p>
              </div>
              <p>
                  <span>Коллекция</span>
                  {collectionName || ""}
                </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  ); 
};

export default DropZone;