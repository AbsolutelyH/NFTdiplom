import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import PasswordChange from "../passwordPage/PasswordChange/PasswordChange";

const changePassword = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Изменение пароля</h1>
        <PasswordChange />
      </div>
    </div>
  );
};

export default changePassword;