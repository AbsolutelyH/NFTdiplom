import React from "react";
import{useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import dynamic from "next/dynamic";

//INTERNAL IMPORT
import Style from "./editCollectionForm.module.css";
import { Button } from "../../components/componentsindex.js";
import { fetchUpdateMe } from "../../redux/slices/auth";


const editCollectionForm = ({fileUser, fileBackUrl, setOpenError, setError, userData}) => {
  const dispatch = useDispatch(); 

  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      about: '',
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
            <label htmlFor="namee">Название</label>
            <input
              type="text"
              placeholder="Какая-то коллекция"
              className={Style.Form_box_input_userName}
            />
          </div>        

          <div className={Style.Form_box_input}>
            <label htmlFor="description">Описание</label>
            <input
              type="text"
              placeholder="Крутая коллекция!"
              className={Style.Form_box_input_userName}
            />
          </div>
    
          <div className={Style.Form_box_btn}>
            <Button
              type="submit"
              btnName="Обновить коллекцию"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(editCollectionForm),{ssr :false})