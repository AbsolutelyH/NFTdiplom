import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

//INTERAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";

const UloadNFT = ({ uploadToIPFS, createNFT }) => {
  const [active, setActive] = useState(0);
  const [itemName, setItemName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
	const [properties, setProperties] = useState("");
    
  const categoryArry = [
    {
      image: images.nft_image_1,
      category: "Сертификаты",
    },
    {
      image: images.nft_image_2,
      category: "Дипломы",
    },
    {
      image: images.nft_image_3,
      category: "Аттестаты",
    },
    {
      image: images.nft_image_3,
      category: "Грамоты",
    },
    {
      image: images.nft_image_3,
      category: "Прочее",
    },
  ];

  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, WEBM , MAX 100MB"
        heading="Перетащите файл"
        subHeading="или загрузите с вашего устройства"
        itemName={itemName}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
				properties={properties}
        image={images.upload}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                placeholder="Илья Львутин"
                className={formStyle.Form_box_input_userName}
                onChange={(e) => setItemName(e.target.value)}
              />
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>

              <input 
                type="text" 
                placeholder="website" 
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
    
            <p className={Style.upload_box_input_para}>
              Скрипт будет включать в себя ссылку на этот URL-адрес на страницу сведений об этом элементе,
              чтобы пользователи могли перейти по ссылке для просмотра подробностей. 
              Вы можете разместить ссылку на свою веб-страницу с более подробной информацией.
            </p>
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor="description">Кем выдан</label>
            <textarea
              name=""
              id=""
            	cols="30"
            	rows="6"
            	placeholder="Информация о лице (организации), выдавшем(ей) документ"
							onChange={(e) => setDescription(e.target.value)}
            ></textarea>
        </div>

        <div className={formStyle.Form_box_input}>
            <label htmlFor="name">Выберите категорию</label>
            <p className={Style.upload_box_input_para}>
              Отнесите документ к одной из следующих категорий
            </p>

            <div className={Style.upload_box_slider_div}>
              {categoryArry.map((el, i) => (
                <div
                  className={`${Style.upload_box_slider} ${
                    active == i + 1 ? Style.active : ""
                  }`}
                  key={i + 1}
                  onClick={() => (setActive(i + 1), setCategory(el.category))}
                >
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                      <Image
                        src={el.image}
                        alt="background image"
                        width={70}
                        height={70}
                        className={Style.upload_box_slider_box_img_img}
                      />
                    </div>
                    <div className={Style.upload_box_slider_box_img_icon}>
                      <TiTick />
                    </div>
                  </div>
                  <p>{el.category} </p>
                </div>
              ))}
            </div>
        </div>

        <div className={formStyle.Form_box_input_social}>
            <div className={formStyle.Form_box_input}>
              <label htmlFor="size">Размер</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <MdOutlineAttachFile />
                </div>
                <input 
									type="text" 
									placeholder="165MB"
									onChange={(e) => setFileSize(e.target.value)} 
								/>
              </div>
            </div>
        </div>      
					
				<div className={Style.upload_box_btn}>
          <Button
            btnName="Загрузить"
						handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
					/>
          <Button
            btnName="Предварительный просмотр"
						handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
					/>
        </div>
      </div>
    </div>
  );
}; 

export default UloadNFT;