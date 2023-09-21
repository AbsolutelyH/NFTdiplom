import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/editCollectionPage.module.css";
import images from "../img";
import EditCollectionForm from "../EditCollectionPage/editCollectionForm/EditCollectionForm"
import { selectIsAuth } from "../redux/slices/auth";
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
import axios from "../redux/axios"

const editCollection = () => {
  const [collectionData, setCollectionData] = useState({
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setCollectionData(router.query);
  }, [router.isReady]);
  const isAuth = useSelector(selectIsAuth);
  const { setOpenError, setError } = useContext(NFTDocumentsContext);
  // if(!isAuth){
  //   typeof window !== 'undefined' && router.push("/login");
  // }

  const [fileUser, setFileUserUrl] = useState(null);
  const [fileBackUrl, setFileBackUrl] = useState(null);

  const { getRootProps:getRootUserProps, getInputProps:getInputUserProps } = useDropzone({
    onDrop: async(acceptedFile) => {
      try{
        const formData = new FormData();
        formData.append('image', acceptedFile[0]);
        const {data} = await axios.post('/api/v1/users/upload', formData);
        setFileUserUrl(data.data.url);
      }catch (error) {setOpenError(true),setError("Что-то пошло не так при загрузке изображения");}
    },
    accept: "image/*",
    maxSize: 5000000,
  });

  const { getRootProps:getRootBackProps, getInputProps:getInputBackProps } = useDropzone({
    onDrop: async(acceptedFile) => {
      try{
        const formData = new FormData();
        formData.append('image', acceptedFile[0]);
        const {data} = await axios.post('/api/v1/users/upload', formData);
        setFileBackUrl(data.data.url);
      }catch (error) {setOpenError(true),setError("Что-то пошло не так при загрузке изображения");}
    },
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Редактирование коллекции</h1>
        
      </div>
      <div className={Style.background_img} {...getRootBackProps()}>
        <input {...getInputBackProps()} />
            {fileBackUrl ? (
              <Image
              src={`http://localhost:3000${fileBackUrl}`}
              alt="background upload"
              objectFit="cover"
              width={1600}
              height={300}
            />
            ) : collectionData?.background ? (
              <Image
              src={`http://localhost:3000${collectionData?.background}`}
              alt="background upload"
              objectFit="cover"
              width={1600}
              height={300}
            />
            ) : (
              <Image
              src={images.creatorbackground2}
              alt="background upload"
              objectFit="cover"
              width={1600}
              height={300}
            />
            )}
        <p className={Style.account_box_img_para}>Измените обложку</p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootUserProps()}>
          <input {...getInputUserProps()} />
          {fileUser ? (
              <Image
              src={`http://localhost:3000${fileUser}`}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
              objectFit="cover"
            />
            ) : collectionData?.photo ? (
              <Image
              src={`http://localhost:3000${collectionData?.photo}`}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
              objectFit="cover"
              />
            ) : (
              <Image
              src={images.doclog}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
              objectFit="cover"
              />
            )}
          <p className={Style.account_box_img_para}>Измените фото</p>
        </div>

        <div className={Style.account_box_from}>
          <EditCollectionForm fileUser={fileUser} fileBackUrl={fileBackUrl} setOpenError={setOpenError} setError={setError} collectionData={collectionData}/>
        </div>
      </div>
    </div>
  );
};

export default editCollection;