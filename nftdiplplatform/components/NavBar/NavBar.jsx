import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error, LogoutNotice } from "../componentsindex";
import images from "../../img";
import { selectIsAuth } from "../../redux/slices/auth";

//IMPORT FROM SMART CONTRACT
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth?.data?.data?.user);
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Навигация") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    } else if (btnText == "Помощь") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
    } else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
    } else {
      setProfile(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError, openlogoutNotice} = useContext(
    NFTDocumentsContext
  );

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <Image
              src={images.logo }
              alt="NFT platform"
              width={115}
              height={80}
              onClick={() => router.push("/")}
            />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Поиск" />
              <BsSearch onClick={() => {}} className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* //END OF LEFT SECTION */}
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_discover}>
            {/* DISCOVER MENU */}
            <p onClick={(e) => openMenu(e)}>Навигация</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* HELP CENTER MENU */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Помощь</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* NOTIFICATION */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={() => openNotification()}
            />
            {notification && <Notification />}
          </div>

           {/* CREATE BUTTON SECTION */}
           <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Подключиться" handleClick={() => connectWallet()} />
            ) : isAuth ?(
              <Button
              btnName="Создать"
              handleClick={() => router.push("/uploadNFT")}
              />
          ) : (
                <Button
                btnName="Подключено"
                handleClick={() => {}}
                />
            )}
          </div>

          {/* USER PROFILE */}


            <div>
            {!isAuth ? (
              <Button
              btnName="Войти"
              handleClick={() => router.push("/login")}
              />
            ) : (
            <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
              {userData?.photo ? (
                <Image
                src={`http://localhost:3000${userData?.photo}`}
                alt="Profile"
                width={40}
                height={40}
                objectFit="cover"
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              ) : (
                <Image
                src={images.defaultuser}
                alt="Profile"
                width={40}
                height={40}
                objectFit="cover"
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />
              )}
                {profile && <Profile currentAccount={currentAccount} />}
              </div>
            </div>
            )}
            </div>

          {/* MENU BUTTON */}

          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className={Style.menuIcon}
              onClick={() => openSideBar()}
            />
          </div>
        </div>
      </div>

      {/* SIDBAR CPMPONE/NT */}
      {openSideMenu && (
        <div className={Style.sideBar}>
          <SideBar setOpenSideMenu={setOpenSideMenu}
            currentAccount={currentAccount}
            connectWallet={connectWallet}
          />
        </div>
        
      )}
      {openError && <Error />}
      {openlogoutNotice && <LogoutNotice/>}
    </div>
  );
};

export default NavBar;