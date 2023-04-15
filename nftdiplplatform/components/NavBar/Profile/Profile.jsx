import React from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./Profile.module.css";
import images from "../../../img";
import { NFTDocumentsContext } from "../../../Context/NFTDocumentsContext";
import { addUser } from "../../../redux/slices/userByWal";

const Profile = ({currentAccount}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.data?.data?.user);
   //IMPORT SMART CONTRACT DATA
   const {setlogoutNotice, setOpenlogoutNotice} = useContext(NFTDocumentsContext);
  const wallet = userData?.walletAdress
  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
      {userData?.photo ? (
            <Image
            src={`http://localhost:3000${userData?.photo}`}
            alt="user profile"
            width={50}
            height={50}
            objectFit="cover"
            className={Style.profile_account_img}
          />
          ) : (
            <Image
            src={images.defaultuser}
            alt="user profile"
            width={50}
            height={50}
            objectFit="cover"
            className={Style.profile_account_img}
          />
          )}

        <div className={Style.profile_account_info}>
          <p>{userData?.name}
          <span>
              {(userData.role == "creator") ? <MdVerified /> :<></>}
          </span>
          </p>
          <small>{wallet?.slice(0, 15)}..</small>
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/account"}}>Профиль</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
            <Link href={{pathname: "/author", query: userData}}>Мои NFT</Link>
            </p>
          </div>
          {userData.role == "creator" ? <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
            <Link href={{pathname: "/createCollectionPage"}}>Создание коллекции</Link>
            </p>
          </div> : <></>}

          {/* {userData.role == "creator" ? <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
            <Link href={{pathname: "/myCollections"}}>Мои коллекции</Link>
            </p>
          </div> : <></>} */}
          
          {/* <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/account" }}>Пройти верефикацию</Link>
            </p>
          </div> */}
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