import React, { useState, useContext } from "react";

//INTERNALIMPORT
import Style from "./PasswordChange.module.css";
import { Button } from "../../components/componentsindex.js";


const PasswordChange = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [password, setPassword] = useState("")

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>        
        <div className={Style.user_box_input_box}>
            <label
              htmlFor="password"
              className={Style.user_box_input_box_label}
            >
              <p>Новый пароль</p>
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

export default PasswordChange;