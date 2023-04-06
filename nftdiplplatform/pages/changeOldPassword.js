import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import OldPasswordChange from "../passwordPage/OldPasswordChange/OldPasswordChange";

const changeOldPassword = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Изменение пароля</h1>
        <OldPasswordChange />
      </div>
    </div>
  );
};

export default changeOldPassword;