import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Error.module.css";
import images from "../../img";

//SMAFRT CONTRCAT IMPORT CONTEXT
import { NFTDocumentsContext } from "../../Context/NFTDocumentsContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTDocumentsContext);
  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
 
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;