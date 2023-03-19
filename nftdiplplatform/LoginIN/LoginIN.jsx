import React, { useState } from "react";
import Link from "next/link";

//INTERNALIMPORT
import Style from "./LoginIN.module.css";
import { Button } from "../components/componentsindex.js";
import { set } from "mongoose";

const UserLogIN = ({user_Login}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailDirty, setEmailDirty] = useState(false)
  const [emailError, setemailError] = useState("Email не может быить пустым")
  


  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const blurHandler = (e) => {
   if (e.target.type === "email") setEmailDirty(true)
  }

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email адрес</label>
            {/* {(emailDirty && emailError) && <div className={Style.user_box_input_box}>{emailError}</div>} */}
            <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} type="email" placeholder="example@emample.com" />
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
            <input onChange={e => passwordHandler(e)} value={password} type="password" />
          </div>
        </div>

        <Button btnName="Продолжить" classStyle={Style.button} handleClick={() => user_Login(email,password)}/>
      </div>
    </div>
  );
};

export default UserLogIN;