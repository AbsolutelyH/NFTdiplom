import React, { useState } from "react";
import Image from "next/image";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorTaps.module.css";

const AuthorTaps = ({
  setCollectiables,
  setCreated,
  setCollections,
  setHiden,
  authUserData,
  userData,
  // setLike,
  // setFollower,
  // setFollowing,
}) => {
  const [openList, setOpenList] = useState(false);
  const [activeBtn, setActiveBtn] = useState(1);
  // const [selectedMenu, setSelectedMenu] = useState("Сертификаты");

  // const listArray = [
  //   "Сертификаты",
  //   "Дипломы",
  //   "Грамоты",
  //   "Аттестаты",
  //   "Прочее",
  // ];

  const openDropDownList = () => {
    if (!openList) {
      setOpenList(true);
    } else {
      setOpenList(false);
    }
  };

  const openTab = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "NFT пользователя") {
      setCollectiables(true);
      setCreated(false);
      setCollections(false);
      setHiden(false);
      // setFollower(false);
      // setFollowing(false);
      // setLike(false);
      setActiveBtn(1);
    } else if (btnText == "Созданные NFT") {
      setCollectiables(false);
      setCreated(true);
      setCollections(false);
      setHiden(false);
      // setFollower(false);
      // setFollowing(false);
      // setLike(false);
      setActiveBtn(2);
    } else if (btnText == "Коллекции автора") {
      setCollectiables(false);
      setCreated(false);
      setCollections(true);
      setHiden(false);
      // setFollower(false);
      // setFollowing(false);
      // setLike(false);
      setActiveBtn(3);
    } else if (btnText == "Скрытые (не забудьте подключиться)") {
      setCollectiables(false);
      setCreated(false);
      setCollections(false);
      setHiden(true);
      // setFollower(false);
      // setFollowing(false);
      // setLike(false);
      setActiveBtn(4);
    } else if (btnText == "Liked") {
      setCollectiables(false);
      setCreated(false);
      setCollections(false);
      setHiden(false);
      // setFollower(false);
      // setFollowing(false);
      // setLike(true);
      setActiveBtn(5);
    } else if (btnText == "Подписки") {
      setCollectiables(false);
      setCreated(false);
      setCollections(false);
      setHiden(false);
      // setFollower(false);
      // setFollowing(true);
      // setLike(false);
      setActiveBtn(6);
    } else if (btnText == "Подписчики") {
      setCollectiables(false);
      setCreated(false);
      setCollections(false);
      setHiden(false);
      // setFollower(true);
      // setFollowing(false);
      // setLike(false);
      setActiveBtn(7);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn == 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              NFT пользователя
            </button>

            {userData?.role == "creator" ?
            <button
              className={`${activeBtn == 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Созданные NFT
            </button>
             : <></>}

            {userData?.role == "creator" ?
            <button
              className={`${activeBtn == 3 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Коллекции автора
              </button> : <></>}

            {authUserData?.walletAdress == userData?.walletAdress ?
            <button
              className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Скрытые (не забудьте подключиться)
            </button> : <></>}
            
            {/* <button
              className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Скрытые
            </button> */}
            {/* <button
              className={`${activeBtn == 4 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Liked
            </button>
            <button
              className={`${activeBtn == 5 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Подписки
            </button>
            <button
              className={`${activeBtn == 6 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Подписчики
            </button> */}
          </div>
        </div>

        {/* <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AuthorTaps;