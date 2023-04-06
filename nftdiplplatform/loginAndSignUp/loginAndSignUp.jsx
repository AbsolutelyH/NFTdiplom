import React, { useState, useContext } from "react";
import Image from "next/image";
import{useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import {useForm} from "react-hook-form"; 

//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";

import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const loginAndSignUp = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {setError, setOpenError} = useContext(NFTDocumentsContext);
  const {currentAccount} = useContext(NFTDocumentsContext);

  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      email: '',
      walletAdress: '',
      password: '',
      passwordConfirm: ''
    }
  });
  
  const onSubmit = async(values) => {
    if(currentAccount){values.walletAdress = currentAccount};
    const data = await dispatch(fetchRegister(values));
    console.log(data);
    if(!data.payload){
      setOpenError(true),setError("Не удалось зарегистрироваться")
    }else{
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if(isAuth){
    router.push("/");
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>
          <div className={Style.user_box_input_box}>
            <label htmlFor="name">Имя</label>
            <input {...register('name')} type="text" placeholder="Ваше имя" />
          </div>
          
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email адрес</label>
            <input {...register('email')} type="email" placeholder="example@emample.com" />
          </div>

          <div className={Style.user_box_input_box}>
            <label htmlFor="adress">Адрес кошелька</label>
            <input
            {...register('walletAdress')}
              type="text"
              placeholder='Нажмите "Подключиться" для автоматического ввода кошелька'
              value={currentAccount}
              id="myInput"
            />
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Пароль</p>
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

export default loginAndSignUp;
