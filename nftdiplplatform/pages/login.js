import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const login = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Войти</h1>
        <LoginAndSignUp />
        <p className={Style.login_box_para}>
          Новый пользователь? <a href="#">Создать аккаунт</a>
        </p>
      </div>
    </div>
  );
};

export default login;