import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./logoutNotice.module.css";
import images from "../../img";
import { Button } from "../componentsindex";

//SMAFRT CONTRCAT IMPORT CONTEXT
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";

const LogoutNotice = () => {
  const { logoutNotice, setOpenlogoutNotice, userLogut } = useContext(NFTDocumentsContext);
  return (
    <div className={Style.Notice} onClick={() => setOpenlogoutNotice(false)}>
      <div className={Style.Notice_box}>
        <div className={Style.Notice_box_info}>
          <p>{logoutNotice}</p>
        </div>
        <Button btnName="Выйти" handleClick={() => userLogut()}/>
      </div>
    </div>
  );
};
export default LogoutNotice;