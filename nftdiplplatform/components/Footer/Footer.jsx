import React from "react";
import Image from "next/image";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Image src={images.logo} alt="footer logo" height={80} width={115} />
          <p>
            Первая площадка для создания диломов и сертификатов в виде NFT.
            Создавайте NFT. Просматривайте дипломы других людей.
            Будьте уверны в подлинности документов!
          </p>

          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Навигация</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Помощь</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Подписка</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Введите email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
            Создавайте NFT дипломы после прохождения KYC. Отправляйте их выпускникам.
            Это надежно и прогрессивно!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;