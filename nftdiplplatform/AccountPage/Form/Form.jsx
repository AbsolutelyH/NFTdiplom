import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";


const Form = () => {
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  return (
    <div className={Style.Form}>
      <div className={Style.Form_box}>
        <form>
          <div className={Style.Form_box_input}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              placeholder="Ваше имя"
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="authorpost">Должность</label>
            <input
              type="text"
              placeholder="Ваша должность"
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="organization">Организация</label>
            <input
              type="text"
              placeholder="Нзвание организации"
              className={Style.Form_box_input_userName}
            />
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="email">Электронная почта</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <HiOutlineMail />
              </div>
              <input type="text" placeholder="Email*" />
            </div>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="description">О вас</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Расскажите о себе в двух словах"
            ></textarea>
          </div>

          <div className={Style.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input type="text" placeholder="website" />
            </div>
          </div>

          
            <div className={Style.Form_box_input}>
              <label htmlFor="facebook">Вконтакте</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialFacebook />
                </div>
                <input type="text" placeholder="http://yourAccaunt" />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Youtube">YouTube</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialYoutube/>
                </div>
                <input type="text" placeholder="http://yourAccaunt" />
              </div>
            </div>

            <div className={Style.Form_box_input}>
              <label htmlFor="Instragram">Telegram</label>
              <div className={Style.Form_box_input_box}>
                <div className={Style.Form_box_input_box_icon}>
                  <TiSocialInstagram />
                </div>
                <input type="text" placeholder="http://yourAccaunt" />
              </div>
            </div>
          

          <div className={Style.Form_box_input}>
            <label htmlFor="wallet">Адрес кошелька</label>
            <div className={Style.Form_box_input_box}>
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
              <input
                type="text"
                value="0x61c88C302D1202dEE968Cd298efA1e6683DD73AB"
                readOnly
                id="myInput"
              />
              <div className={Style.Form_box_input_box_icon}>
                <MdOutlineContentCopy 
                  onClick={() => copyAddress()}
                />
              </div>
            </div>
          </div>

          <div className={Style.Form_box_link}>
            <label>
              <Link href={{ pathname: "/changeOldPassword" }}>Изменить пароль</Link>
            </label>
          </div>
    
          <div className={Style.Form_box_btn}>
            <Button
              btnName="Обновить профиль"
              handleClick={() => {}}
              classStyle={Style.button}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;