import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import Link from "next/link";
import{useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import dynamic from "next/dynamic";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";
import { fetchUpdateMe } from "../../redux/slices/auth";


const Form = ({fileUser, fileBackUrl, setOpenError, setError, userData}) => {
  const dispatch = useDispatch(); 
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      about: '',
      website: '',
      vk: '',
      telegram: '',
      youtube: '',
      photo: '',
      background: ''
    }
  });

  const onSubmit = async(values) => {
    {(!fileUser && userData?.photo) ? values.photo = userData?.photo : values.photo = fileUser};
    {(!fileBackUrl && userData?.background) ? values.background = userData?.background : values.background = fileBackUrl};
    {(!values.name && userData?.name) ? values.name = userData?.name : ''};
    {(!values.about && userData?.about) ? values.about = userData?.about : ''};
    {(!values.website && userData?.website) ? values.website = userData?.website : ''};
    {(!values.vk && userData?.vk) ? values.vk = userData?.vk : ''};
    {(!values.telegram && userData?.telegram) ? values.telegram = userData?.telegram : ''};
    {(!values.youtube && userData?.youtube) ? values.youtube = userData?.youtube : ''};
    console.log("Данные с сайта ", values);
    const data = await dispatch(fetchUpdateMe(values));
    console.log("данные от серва ",data);
    if(!data.payload){
      setOpenError(true),setError("Не удалось обновить профиль")
    }
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Style.Form_box_input}>
            <label htmlFor="namee">Имя</label>
            <input
              {...register('name')}
              type="text"
              placeholder={userData?.name}
              className={Style.Form_box_input_userName}
            />
          </div>
          {userData?.role == "creator" && 
          (<div className={Style.Form_box_input}>
            <label htmlFor="authorpost">Должность</label>
            <input
              type="text"
              value={userData?.post}
              readOnly
              className={Style.Form_box_input_userName}
            />
          </div>)}
          {userData?.role == "creator" && (
          <div className={Style.Form_box_input}>
            <label htmlFor="organization">Организация</label>
            <input
              type="text"
              value={userData?.organization}
              readOnly
              className={Style.Form_box_input_userName}
            />
          </div>)}

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Электронная почта</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input
               type="text"
               value={userData?.email}
               readOnly
              />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">О вас</label>
            <input
              {...register('about')}
              type="text"
              placeholder={userData?.about}
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input {...register('website')} type="text" placeholder={userData?.website} />
            </div>
          </div>

          
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Вконтакте</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input {...register('vk')} type="text" placeholder={userData?.vk} />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Youtube">YouTube</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialYoutube/>
                </div>
                <input {...register('youtube')} type="text" placeholder={userData?.youtube} />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">Telegram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input {...register('telegram')} type="text" placeholder={userData?.telegram} />
              </div>
            </div>
          

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Адрес кошелька</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                value={userData?.walletAdress}
                readOnly
                id="myInput"
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy 
                  onClick={() => copyAddress()}
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_link}>
            <label>
              <Link href={{ pathname: "/changeOldPassword" }}>Изменить пароль</Link>
            </label>
          </div>
    
          <div className={Style.Form_box_btn}>
            <Button
              type="submit"
              btnName="Обновить профиль"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Form),{ssr :false})