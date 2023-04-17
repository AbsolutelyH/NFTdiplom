import React from "react";
import{useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./editCollectionForm.module.css";
import { Button } from "../../components/componentsindex.js";
import { fetchUpdateCollection } from "../../redux/slices/newCollection";


const editCollectionForm = ({fileUser, fileBackUrl, setOpenError, setError, collectionData}) => {
  const dispatch = useDispatch(); 
  const router = useRouter();

  const {register, handleSubmit} = useForm({
    defaultValues: {
      // nameOfColl: '',
      _id: '',
      walletAdressCreator: '',
      about: '',
      background: '',
      photo: ''
    }
  });

  const onSubmit = async(values) => {
    {values._id = collectionData._id};
    {values.walletAdressCreator = collectionData.walletAdressCreator};
    {(!fileUser && collectionData?.photo) ? values.photo = collectionData?.photo : values.photo = fileUser};
    {(!fileBackUrl && collectionData?.background) ? values.background = collectionData?.background : values.background = fileBackUrl};
    // {(!values.nameOfColl && collectionData?.nameOfColl) ? values.nameOfColl = collectionData?.nameOfColl : ''};
    {(!values.about && collectionData?.about) ? values.about = collectionData?.about : ''};
    console.log("Данные с сайта ", values);
    const data = await dispatch(fetchUpdateCollection(values));
    console.log("данные от серва ",data);
    if(data.payload){
      setOpenError(true),setError("Коллекция изменена")
    }
    if(!data.payload){
      setOpenError(true),setError("Не удалось обновить коллекцию")
    }
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className={Style.Form_box_input}>
            <label htmlFor="name">Название</label>
            <input
              type="text"
              placeholder={collectionData?.nameOfColl}
              className={Style.Form_box_input_userName}
            />
          </div>         */}

          <div className={Style.Form_box_input}>
            <label htmlFor="about">Описание</label>
            <input {...register('about')} type="text" placeholder={collectionData?.about} className={Style.Form_box_input_userName} />
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