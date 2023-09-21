import React from "react";
import{useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./CollectionForm.module.css";
import { Button } from "../../components/componentsindex.js";
import { fetchNewCollection } from "../../redux/slices/newCollection";


const CollectionForm = ({fileUser, fileBackUrl, setOpenError, setError, userData}) => {
  const dispatch = useDispatch(); 
  const router = useRouter();

  const {register, handleSubmit} = useForm({
    defaultValues: {
      nameOfcoll: '',
      walletAdressCreator: '',
      about: '',
      background: '',
      photo: ''
    }
  });

  const onSubmit = async(values) => {
    if(fileUser){values.photo = fileUser};
    if(fileBackUrl){values.background = fileBackUrl};
    if(userData){values.walletAdressCreator = userData.walletAdress};
    console.log("Данные с сайта ", values);
    const data = await dispatch(fetchNewCollection(values));
    console.log("данные от серва ",data);
    if(data.payload){
      setOpenError(true),setError("Коллекция создана успешно")
    }
    if(!data.payload){
      setOpenError(true),setError("Не удалось создать коллекцию")
    }
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={Style.Form_box_input}>
            <label htmlFor="nameOfcoll">Название</label>
            <input
            {...register('nameOfcoll')}
              type="text"
              placeholder="Название колеекции"
              className={Style.Form_box_input_userName}
            />
          </div>        

          <div className={Style.Form_box_input}>
            <label htmlFor="about">Описание</label>
            <input
            {...register('about')}
              type="text"
              placeholder="Описание коллекции"
              className={Style.Form_box_input_userName}
            />
          </div>
    
          <div className={Style.Form_box_btn}>
            <Button
              type="submit"
              btnName="Создать коллекцию"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CollectionForm),{ssr :false})