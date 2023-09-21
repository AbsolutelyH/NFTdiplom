import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

//INTERNAL IMPORT
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

const contactus = () => {
  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Свяжитесь с нами</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            {/* <div className={Style.contactus_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div> */}
            <div className={Style.contactus_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>example@example.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>-</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌏 Соц.сети</h3>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialLinkedin />
              </a>
              <a href="#">
                <TiSocialInstagram />
              </a>
              <a href="#">
                <TiSocialYoutube />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
            </div>
          </div>
          <div className={Style.contactus_box_box_right}>
            <form>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Как вас зовут?</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className={formStyle.Form_box_input_userName}
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="text" placeholder="Куда вам ответить" />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">Сообщение</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="Ваш вопрос"
                ></textarea>
              </div>
              <Button
                btnName="Отправить"
                handleClick={() => {}}
                classStyle={Style.button}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;