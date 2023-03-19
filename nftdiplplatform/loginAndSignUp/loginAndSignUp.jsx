import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./loginAndSignUp.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";

import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const loginAndSignUp = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  const blurHandler = (e) => {
   if (e.target.type === "email") setEmailDirty(true)
  }

  const {currentAccount} = useContext(NFTDocumentsContext);

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>
          <div className={Style.user_box_input_box}>
            <label htmlFor="name">Имя</label>
            <input type="text" placeholder="Львутин Илья Александрович" />
          </div>
          
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email адрес</label>
            <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} type="email" placeholder="example@emample.com" />
          </div>

          <div className={Style.user_box_input_box}>
            <label htmlFor="adress">Адрес кошелька</label>
            <input
              type="text"
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
            <input onChange={e => passwordHandler(e)} value={password} type="password" />
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Подтверждение пароля</p>
            </label>
            <input type="password" />
          </div>
        </div>

        <Button btnName="Продолжить" classStyle={Style.button}/>
      </div>
    </div>
  );
};

export default loginAndSignUp;
