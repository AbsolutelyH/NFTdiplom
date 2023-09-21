import React, {useEffect, useContext, useState} from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Collection from "../Collection/Collection";

const collection = () => {
  const [collectionData, setSollectionData] = useState({
    nameOfcoll: "",
    walletAdressCreator: "",
  });
  const [load, setLoad] = useState(false);
  console.log(load);
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setSollectionData(router.query);
    setLoad(true);
  }, [router.isReady]);
  return (
    <div>
     {load ? (<Collection collectionData={collectionData} />) : (<></>)}
    </div>
  );
};

export default collection;