import React, { useContext, useEffect, useState } from "react";
import {useForm} from "react-hook-form"; 
import{useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
//INTERNALIMPORT
import Style from "./OldPasswordChange.module.css";
import { Button } from "../../components/componentsindex.js";
import { selectIsAuth, fetchUpdateMyPassword } from "../../redux/slices/auth";
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";


const OldPasswordChange = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const {setError, setOpenError} = useContext(NFTDocumentsContext);

  const {register, handleSubmit} = useForm({
    defaultValues: {
      passwordCurrent: '',
      password: '',
      passwordConfirm: ''
    }
  });
  
  const onSubmit = async(values) => {
    console.log(values);
    const data = await dispatch(fetchUpdateMyPassword(values));
    console.log(data);
    if(!data.payload){
      setOpenError(true),setError("Не удалось сменить пароль")
    }else{
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  // useEffect(()=>{
  //   if(!isAuth){
  //     router.push("/");
  //   }
  // })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>        
        	<div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Старый пароль</p>
            </label>
            <input {...register('passwordCurrent')} type="password" />
            
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Новый пароль</p>
            </label>
            <input {...register('password')} type="password" />

            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Подтверждение пароля</p>
            </label>
            <input {...register('passwordConfirm')} type="password" />
          </div>
        </div>
        <Button type="submit" btnName="Продолжить" classStyle={Style.button} handleClick={() => {}}/>
      </div>
    </div>
    </form>
  );
};

export default OldPasswordChange;