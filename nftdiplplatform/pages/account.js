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

const account = () => {
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);
  if(!isAuth){
    typeof window !== 'undefined' && router.push("/login");
  }

  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.account}>
      <div className={Style.background_img} {...getRootProps()}>
        <input {...getInputProps()} />
        <Image
          src={images.creatorbackground2}
          alt="background upload"
          objectFit="cover"
          width={1600}
          height={300}
        />
        <p className={Style.account_box_img_para}>Измените фон</p>
      </div>
      <div className={Style.account_info}>
        <h1>Настройки профиля</h1>
        <p>
        Вы можете поменять имя, рассказать о себе и добавить ссылки на ваши соц. сети.
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img} {...getRootProps()}>
          <input {...getInputProps()} />
          <Image
            src={images.user1}
            alt="account upload"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Измените фото</p>
        </div>
        <div className={Style.account_box_from}>
          <From />
        </div>
      </div>
    </div>
  );
};

export default account;