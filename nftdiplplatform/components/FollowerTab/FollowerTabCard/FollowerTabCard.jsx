import React, { useState } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {useForm} from "react-hook-form"; 
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./FollowerTabCard.module.css";
import images from "../../../img";
import { fetchUserByWal, addUser } from "../../../redux/slices/userByWal";

const FollowerTabCard = ({ el, back}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const what = true;
  const followMe = () => {
    if (!following) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  };
  return (
    <div className={Style.FollowerTabCard}>
      <div className={Style.FollowerTabCard_box}>
        <div className={Style.FollowerTabCard_box_img}>
        <Link href={{pathname: "/author", query: el}}>
         {back ? (
              <Image
              className={Style.FollowerTabCard_box_img_img}
              alt="profile braground"
              width={500}
              height={300}
              objectFit="cover"
              src={`http://localhost:3000${el.background}`}
              // onClick={()=>{
              //   dispatch(addUser(el));
              //   router.push("/author" );
              // }}
              
            />
            ) : ( 
              <Image
              // onClick={()=>{
              //   dispatch(addUser(el));
              //   router.push("/author");
              // }}
                className={Style.FollowerTabCard_box_img_img}
                src={images.creatorbackground1}
                alt="profile braground"
                width={500}
                height={300}
                objectFit="cover"
                />
             )}
            </Link>
        </div>
        <div className={Style.FollowerTabCard_box_profile}>
          {el.photo ? (
            <Image
            className={Style.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={50}
            height={50}
            objectFit="cover"
            src={`http://localhost:3000${el?.photo}`}
          />
          ) : (
            <Image
            className={Style.FollowerTabCard_box_profile_img}
            alt="profile picture"
            width={50}
            height={50}
            objectFit="cover"
            src={images.defaultuser}
          />
          )}
        
        </div>

        <div className={Style.FollowerTabCard_box_info}>
          <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
              {el.name}
              {""}
              <span>
              {(el.role == "creator") ? <MdVerified /> :<></>}
              </span>
            </h4>
          </div>

          {/* <div className={Style.FollowerTabCard_box_info_following}>
            {following ? (
              <a onClick={() => followMe()}>
                Отписаться{""}{" "}
                <span>
                  <TiTick />
                </span>
              </a>
            ) : (
              <a onClick={() => followMe()}>Подписаться</a>
            )}
          </div> */}
        </div>
      </div>
    </div> 
  );
};

export default FollowerTabCard;
