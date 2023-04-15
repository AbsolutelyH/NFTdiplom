import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

//INTERAL IMPORT
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import { Button } from "../components/componentsindex.js";
import { DropZone } from "../UploadNFT/uploadNFTIndex.js";
import { fetchMyCollections } from "../redux/slices/collections";

const UloadNFT = ({ uploadToIPFS, createNFT, userData, currentAccount }) => {
  //const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [authorpost, setAuthorpost] = useState("");
  const [organization, setOrganization] = useState("");
  const [recipient, setRecipient] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  //const [royalties, setRoyalties] = useState("");
  //const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
	const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);
  const [activeColl, setActiveColl] = useState(0);
  const [collectionName, setCollectionName] = useState(0);
  const [userCollections, setUserCollections] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch()

  const getCollections = async() => {const collections = await dispatch(fetchMyCollections({walletAdressCreator: userData.walletAdress}));setUserCollections(collections?.payload?.data?.mYcollections);}
  React.useEffect(() => {
    if(!userData) return;
    getCollections();
    setAuthorpost(userData.post);
    setAuthor(userData.name);
    setOrganization(userData.organization);
  }, [userData])
    
  const categoryArry = [
    {
      image: images.category_image_1,
      category: "Сертификаты",
    },
    {
      image: images.category_image_2,
      category: "Дипломы",
    },
    {
      image: images.category_image_3,
      category: "Аттестаты",
    },
    {
      image: images.category_image_4,
      category: "Грамоты",
    },
    {
      image: images.category_image_5,
      category: "Прочее",
    },
  ];


  return (
    <div className={Style.upload}>
      <DropZone
        title="JPG, PNG, MAX 100MB"
        heading="Перетащите файл"
        subHeading="или загрузите с вашего устройства"
        name={name}
        author={author}
        authorpost={authorpost}
        organization={organization}
        recipient={recipient}
        website={website}
        description={description}
        //royalties={royalties}
        //fileSize={fileSize}
        collectionName={collectionName}
        category={category}
				properties={properties}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <div className={Style.upload_box}>
        <div className={formStyle.Form_box_input}>
              <label htmlFor="name">Название NFT документа</label>
              <input
                type="text"
                placeholder="Сертификат за прохождение курса WEB3"
                className={formStyle.Form_box_input_userName}
                onChange={(e) => setName(e.target.value)}
              />
        </div>

        <div className={formStyle.Form_box_input}>
              <label htmlFor="author">Автор</label>
              <input
                type="text"
                value={userData?.name}
                placeholder="Ваше полное имя"
                className={formStyle.Form_box_input_userName}
                // onChange={(e) => setAuthor(e.target.value)}
              />
        </div>

        <div className={formStyle.Form_box_input}>
              <label htmlFor="authorpost">Должность</label>
              <input
               value={userData?.post}
                type="text"
                placeholder="Ваша должность"
                className={formStyle.Form_box_input_userName}
                // onChange={(e) => setAuthorpost(e.target.value)}
              />
        </div>

        <div className={formStyle.Form_box_input}>
              <label htmlFor="organization">Организация</label>
              <input
               value={userData?.organization}
                type="text"
                placeholder="Ваша организация"
                className={formStyle.Form_box_input_userName}
                // onChange={(e) => setAuthorpost(e.target.value)}
              />
        </div>

        <div className={formStyle.Form_box_input}>
              <label htmlFor="recipient">Получатель</label>
              <input
                type="text"
                placeholder="Полное имя получателя"
                className={formStyle.Form_box_input_userName}
                onChange={(e) => setRecipient(e.target.value)}
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
            <label htmlFor="description">Описание</label>
            <textarea
              name=""
              id=""
            	cols="30"
            	rows="6"
            	placeholder="Описание документа который вы создаете"
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

        <div className={formStyle.Form_box_input}>
            <label htmlFor="name">Выберите коллекцию</label>
            <p className={Style.upload_box_input_para}>
              Вы можете отнести документ к одной из ваших коллекций
            </p>

            <div className={Style.upload_box_slider_div}>
              {userCollections?.map((el, i) => (
                <div
                  className={`${Style.upload_box_slider} ${
                    activeColl == i + 1 ? Style.active : ""
                  }`}
                  key={i + 1}
                  onClick={() => (setActiveColl(i + 1), setCollectionName(el.nameOfcoll), console.log(el.nameOfcoll))}
                >
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                    {el.photo ? <Image
                        src={`http://localhost:3000${el?.photo}`}
                        alt="background image"
                        objectFit="cover"
                        width={70}
                        height={70}
                        className={Style.upload_box_slider_box_img_img}
                      /> : <Image
                      src={images.doclog}
                      alt="background image"
                      objectFit="cover"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />}
                    </div>
                    <div className={Style.upload_box_slider_box_img_icon}>
                      <TiTick />
                    </div>
                  </div>
                  <p>{el?.nameOfcoll} </p>
                </div>
                
              ))}
            </div>
        </div>

        

        {/* <div className={formStyle.Form_box_input_social}>
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
        </div>       */}
				
        {/* <div className={formStyle.Form_box_input}>
            <label htmlFor="Price">Price</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <AiTwotonePropertySafety />
              </div>
              <input
                type="text"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div> */}

          <div className={Style.upload_box_btn}>
          <Button
            btnName="Загрузка"
            handleClick={async () =>
        {      createNFT(
                name,
                author,
                authorpost,
                recipient,
                image,
                description,
                router,
                website,
                userData,
                category,
                collectionName,
                organization,
                // royalties,
                // fileSize,
                // category,
                // properties
              )
              console.log(collectionName)}
            }
            classStyle={Style.upload_box_btn_style}
          />
          {/* <Button
            btnName="Предварительный просмотр"
						handleClick={() => {}}
            classStyle={Style.upload_box_btn_style}
					/> */}
        </div>
      </div>
    </div>
  );
}; 

export default UloadNFT;