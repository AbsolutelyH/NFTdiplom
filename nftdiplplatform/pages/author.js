import React, {useEffect, useContext, useState} from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Author from "../Author/Author";

const author = () => {

  const [userData, setuserData] = useState({
    about: "",
    background: "",
    name: "",
    oranization: "",
    photo: "",
    role: "",
    telegram: "",
    vk: "",
    walletAdress: "",
    website: "",
    youtube: "",
    _id: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setuserData(router.query);
  }, [router.isReady]);
  return (
    <div>
      <Author userData={userData} />
    </div>
  );
};

export default author;