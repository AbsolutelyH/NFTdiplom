import React, {useState} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import UserLogIN from "../LoginIN/LoginIN";


const login = () => {

  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Войти</h1>
        <UserLogIN/>
        <p className={Style.login_box_para}>
          Новый пользователь? <Link href={{ pathname: "/signUp" }}>Создать аккаунт</Link>
        </p>
      </div>
    </div>
  );
};

export default login;