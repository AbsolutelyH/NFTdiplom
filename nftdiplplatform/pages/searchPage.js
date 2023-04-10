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
  const [usersObj, setUserObj] = useState([]);
  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [])
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.users);
  const usersCopy = (users.items?.data?.users);

  const isLoading = users.status == 'loading';

  const onHandleSearch = (value) => {
    const filteredUSERS = usersObj.filter(({name}) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredUSERS.length === 0) {
      setUserObj(usersCopy);
    } else {
      setUserObj(filteredUSERS);
    }
  };

  const onClearSearch = () => {
    if (usersObj?.length && usersCopy?.length) {
      setUserObj(usersCopy);
    }
  };
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
              onHandleSearch={onHandleSearch}
              onClearSearch={onClearSearch}
      />
      {isLoading ? <Loader/> : usersObj.length != 0 ?(
        <div className={Style.searchPage_box}> 
          {usersObj?.map((obj) => <FollowerTabCard el={obj} back={obj.background}/>)}
        </div>) : (
          <div className={Style.searchPage_box}> 
            {usersCopy?.map((obj) => <FollowerTabCard el={obj} back={obj.background}/>)}
          </div>)
        }
   
    </div>
  );
};

export default searchPage;