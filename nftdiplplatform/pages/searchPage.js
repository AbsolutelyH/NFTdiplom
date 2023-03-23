import React, {useEffect, useState, useContext} from "react";
import { useDispatch, useSelector } from "react-redux";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
//import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard"
import axios from "../redux/axios";
import {Loader} from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
import { fetchUsers } from "../redux/slices/users";

const searchPage = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.users);
  const isLoading = users.status == 'loading';

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [])
  console.log(users);

  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar />
      {isLoading ? <Loader/> :
        <div className={Style.searchPage_box}>
          {users.items.data.users.map((obj, index) => (
            <FollowerTabCard i={index} el={obj} />
          ))}
        </div>}
   
    </div>
  );
};

export default searchPage;