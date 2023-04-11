import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


//INTERNAL IMPORT
import Style from "../styles/createCollectionPage.module.css";
import images from "../img";
import CollectionForm from "../CreateCollectionPage/CollectionForm/CollectionForm";
import { selectIsAuth } from "../redux/slices/auth";
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
import axios from "../redux/axios"

const collection = () => {
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);
  const { setOpenError, setError } = useContext(NFTDocumentsContext);
  // if(!isAuth){
  //   typeof window !== 'undefined' && router.push("/login");
  // }

  const userData = useSelector((state) => state.auth.data?.data?.user);
  console.log(userData);

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
    maxSize: 10000000,
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
    maxSize: 10000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Создание коллекции</h1>
        
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
            ) : (
              <Image
              src={images.creatorbackground2}
              alt="background upload"
              objectFit="cover"
              width={1600}
              height={300}
            />
            )}
        <p className={Style.account_box_img_para}>Добавьте обложку</p>
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
          <p className={Style.account_box_img_para}>Добавьте фото</p>
        </div>
      
        <div className={Style.account_box_from}>
          <CollectionForm fileUser={fileUser} fileBackUrl={fileBackUrl} setOpenError={setOpenError} setError={setError} userData={userData}/>
        </div>
      </div>
    </div>
  );
};

export default collection;