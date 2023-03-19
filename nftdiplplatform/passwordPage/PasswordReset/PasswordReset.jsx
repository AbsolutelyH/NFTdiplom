import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNALIMPORT
import Style from "./PasswordReset.module.css";
import { Button } from "../../components/componentsindex.js";


const PasswordReset = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [email, setEmail] = useState("")

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const router = useRouter();

  return (
    <div className={Style.user}>
      <div className={Style.user_box}>
        <div className={Style.user_box_input}>        
          <div className={Style.user_box_input_box}>
            <label htmlFor="email">Email адрес</label>
            <input onChange={e => emailHandler(e)} value={email} type="email" placeholder="example@emample.com" />
          </div>
        </div>

        <Button 
          btnName="Продолжить" 
          classStyle={Style.button}
          handleClick={() => router.push("/changePassword")}
        />
      </div>
    </div>
  );
};

export default PasswordReset;
