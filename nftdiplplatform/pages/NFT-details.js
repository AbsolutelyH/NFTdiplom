import React, {useEffect, useContext, useState} from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT
import { NFTDocumentsContext } from "../Context/NFTDocumentsContext";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTDocumentsContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    creator: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);
  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      {/* <Brand /> */}
    </div>
  );
};

export default NFTDetails;