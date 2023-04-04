import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  const userData = useSelector((state) => state.auth?.data?.data?.user);
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Коллекции",
      link: "collection",
    },
    {
      name: "Поиск",
      link: "searchPage",
    },
    // {
    //   name: "Мои NFT",
    //   link: "author",
    // },
    // {
    //   name: "NFT Подробности",
    //   link: "NFT-details",
    // },
    {
      name: "Настройки аккаунта",
      link: "account",
    },
    // {
    //   name: "Создать NFT",
    //   link: "uploadNFT",
    // },
    {
      name: "Подключить кошелек",
      link: "connectWallet",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;