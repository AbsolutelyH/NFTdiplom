import React, {useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
//import{useDispatch} from "react-redux";


//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import UserLogIN from "../LoginIN/LoginIN";
import Notice from "../components/Notice/Notice";

const login = () => {
    //STATE VARIABLE
    const [openNotice, setOpenNotice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logingError, setLogingError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    //const dispatch = useDispatch();

    const refreshPage = () => {
      window.location.reload();
    };

    //LOGING USER
    const user_Login = async (email, password) => {
      //e.preventDefault();
      try {
        //setLoading(true);
        const res = await axios({
          method: "POST",
          url: "/api/v1/users/login",
          withCredentials: true,
          data: {
            email,
            password,
          },
        });
        if(res.data.status === "Success") {
          console.log("uspex");
          setSuccessMessage("Вы успешно вошли!");
          //dispatch(selectCurrentState(res.data.data.user));
          //setLoading(false);
          setOpenNotice(true);
          router.push("/account");
          window.setTimeout(() => {
            router.push("/account");
          }, 1500);
        }
      } catch (err) {
        setLogingError(err.response.data.message);
        setOpenNotice(true);
        window.setTimeout(() => {
        location.reload(true);
        }, 1500);
      }
    };

  return (
    <div className={Style.login}>
      <div className={Style.login_box}>
        <h1>Войти</h1>
        <UserLogIN user_Login={user_Login}/>
        <p className={Style.login_box_para}>
          Новый пользователь? <a href="#">Создать аккаунт</a>
        </p>
      </div>
      {openNotice ? (<Notice openNotice={openNotice} successMessage={successMessage} logingError={logingError}/>):("")}
    </div>
  );
};

export default login;