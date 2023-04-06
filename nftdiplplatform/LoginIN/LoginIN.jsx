import React, { useContext, useState } from "react";
import {useForm} from "react-hook-form"; 
import{useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

//INTERNALIMPORT
import Style from "./LoginIN.module.css";
import { Button } from "../components/componentsindex.js";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";
import {NFTDocumentsContext} from "../Context/NFTDocumentsContext"

const UserLogIN = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {setError, setOpenError} = useContext(NFTDocumentsContext);


    const {register, handleSubmit} = useForm({
      defaultValues: {
        email: '',
        password: ''
      }
    });
    
    const onSubmit = async(values) => {
      console.log(values);
      const data = await dispatch(fetchAuth(values));
      console.log(data);
      if(!data.payload){
        setOpenError(true),setError("Не удалось авторизоваться")
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
            <label htmlFor="email">Email адрес</label>
            <input {...register('email')} type="email" placeholder="example@emample.com" />
          </div>

          <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Пароль</p>
              <p>
              <Link href={{ pathname: "/resetPassword" }}>Забыли пароль</Link>
              </p>
            </label>
            <input {...register('password')} type="password" />
          </div>
        </div>

        <Button type="submit" btnName="Продолжить" classStyle={Style.button} handleClick={() => {}}/>
      </div>
    </div>
    </form>
  );
};

export default UserLogIN;