import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "./Notice.module.css";

const Notice = ({openNotice, successMessage, logingError}) => {
    const [openNoticeIN, setOpenNoticeIN] = useState(openNotice);
    const massege = "";
    if (successMessage !== "") {
        massege = successMessage;
    } else {
        massege = logingError;
    }
  return (
    <div className={Style.Notice} onClick={() => setOpenNoticeIN(false)}>
      <div className={Style.Notice_box}>
        <div className={Style.Notice_box_info}>
          <p>{massege}</p>
        </div>
      </div>
    </div>
  );
};

export default Notice;