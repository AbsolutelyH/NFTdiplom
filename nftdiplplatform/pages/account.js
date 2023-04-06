import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import From from "../AccountPage/Form/Form";
import { selectIsAuth } from "../redux/slices/auth";
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
import axios from "../redux/axios"

const account = () => {
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
        <h1>Настройки профиля</h1>
        
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
            ) : userData?.background ? (
              <Image
              src={`http://localhost:3000${userData?.background}`}
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
        <p className={Style.account_box_img_para}>Измените фон</p>
      </div>
      <div className={Style.account_info}>
        {/* <h1>Настройки профиля</h1> */}
        <p>
        Вы можете поменять имя, рассказать о себе и добавить ссылки на ваши соц. сети.
        </p>
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
            ) : userData?.photo ? (
              <Image
              src={`http://localhost:3000${userData?.photo}`}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
              objectFit="cover"
              />
            ) : (
              <Image
              src={images.defaultuser}
              alt="account upload"
              width={150}
              height={150}
              className={Style.account_box_img_img}
              objectFit="cover"
              />
            )}
          <p className={Style.account_box_img_para}>Измените фото</p>
          <p className={Style.account_verify_para}>
            Для прохождения верификации 
            отправьте письмо на электронный 
            адрес lvutin2001@gmail.com
          </p>
        </div>
        <div className={Style.account_box_from}>
          <From fileUser={fileUser} fileBackUrl={fileBackUrl} setOpenError={setOpenError} setError={setError} userData={userData}/>
        </div>
      </div>
    </div>
  );
};

export default account;