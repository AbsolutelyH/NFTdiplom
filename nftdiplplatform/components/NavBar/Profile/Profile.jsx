import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useContext } from "react";
import { useSelector } from "react-redux";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";
import { NFTDocumentsContext } from "../../../Context/NFTDocumentsContext";

const Profile = ({currentAccount}) => {
  const userData = useSelector((state) => state.auth?.data?.data?.user);
   //IMPORT SMART CONTRACT DATA
   const {setlogoutNotice, setOpenlogoutNotice} = useContext(NFTDocumentsContext);
  const wallet = userData?.walletAdress
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        <Image
          src={images.user1}
          alt="user profile"
          width={50}
          height={50}
          className={Style.profile_account_img}
        />

        <div className={Style.profile_account_info}>
          <p>{userData?.name}</p>
          <small>{currentAccount?.slice(0, 15)}..</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/account" }}>Профиль</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/author" }}>Мои NFT</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Пройти</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/help" }}>Помощь</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
              <p onClick={() => {setOpenlogoutNotice(true),setlogoutNotice("Вы уверенны, что хотите выйти?")}}>
                Выйти
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;