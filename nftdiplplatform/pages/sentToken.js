import React, {useEffect, useContext, useState} from "react";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/sentToken.module.css";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard"
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";
import { fetchUserByWal } from "../redux/slices/userByWal";

//IMPORT SMART CONTRACT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const sentToken = () => {
  const [userOwner, setUserOwner] = useState();
  const dispatch = useDispatch();
  const getDataFirst = async() => {const dataFirst = await dispatch(fetchUserByWal({walletAdress: adress})); setUserOwner(dataFirst?.payload?.data?.user); }


  const userData = useSelector((state) => state.auth.data?.data?.user);
  const { makeTransferToken } = useContext(NFTDocumentsContext);
  const [adress, setAdress] = useState();
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

  useEffect(() => {
    if (!adress) return;
    getDataFirst();
  }, [adress]);

  console.log(userOwner);

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const sentNFT = async () => {
    try {
      await makeTransferToken(adress, id);
      router.push({pathname: "/author", query: userData});
    } catch (error) {
      console.log("Error while resell", error);
    }
  };
  return (
    <div className={Style.sentToken}>
      <div className={Style.sentToken_box}>
        <h1>Отправьте NFT, укажите адрес получателя</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Адрес</label>
          <input
            type="text"
            placeholder="Адрес получателя"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>

        <div className={Style.sentToken_box_image}>
          {image && (
            <Image src={image} alt="отправить NFT" width={400} height={400} />
          )}
        </div>

        <div className={Style.searchPage_box}>
          {userOwner ? <FollowerTabCard el={userOwner} back={userOwner?.background}/> : <></>} 
        </div>

        <div className={Style.sentToken_box_btn}>
          <Button btnName="Отправить NFT" handleClick={() => sentNFT()} />
        </div>
      </div>
    </div>
  );
};

export default sentToken;