import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import PasswordReset from "../passwordPage/PasswordReset/PasswordReset";

const resetPassword = () => {
  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Изменение пароля</h1>
        <PasswordReset />
      </div>
    </div>
  );
};

export default resetPassword;