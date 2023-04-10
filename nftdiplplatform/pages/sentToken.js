import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { useSelector } from "react-redux";

//INTERNAL IMPORT
import Style from "../styles/sentToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";

const sentToken = () => {
  const userData = useSelector((state) => state.auth.data?.data?.user);
  const { makeTransferToken } = useContext(NFTDocumentsContext);
  const [adress, setAdress] = useState();
  const [image, setImage] = useState("");
  const router = useRouter();
  const { id, tokenURI } = router.query;

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

        <div className={Style.sentToken_box_btn}>
          <Button btnName="Отправить NFT" handleClick={() => sentNFT()} />
        </div>
      </div>
    </div>
  );
};

export default sentToken;