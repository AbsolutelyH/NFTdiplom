import React, { useState, useEffect, useContext } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignNFT } from "../redux/slices/signNFT";

import { fetchPostNFT } from "../redux/slices/singleNFT";


const projectId = "2MQMDMkSJ1Tw6WlsDIldFnI8I28";
const projectSecretKey = "02f0ce3dc0055c849f43f256907286ee";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

const subdomain = "https://guu-nft-diploms.infura-ipfs.io";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL  IMPORT
import { NFTDocumentsAddress, NFTDocumentsABI } from "./constants";
import { fetchAuthMe, logout } from "../redux/slices/auth";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTDocumentsAddress,
    NFTDocumentsABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTDocumentsContext = React.createContext();

export const NFTDocumentsProvider = ({ children }) => {

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [logoutNotice, setlogoutNotice] = useState("");
  const [openlogoutNotice, setOpenlogoutNotice] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // //--- GET WALLET OF SOME USER
  // const userData = useSelector((state) => state.userByWal?.data);
  // console.log(userData); 

  //---CHECK IF WALLET IS CONNECTD
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true),setError("Установите MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        // setOpenError(true),setError("Не найдено аккаунта");
      }
      // console.log(currentAccount);
    } catch (error) {
      setOpenError(true),setError("Что-то пошло не так при подключении к кошельку");
    }
  };

  // useEffect(() => {
  //   // checkIfWalletConnected();
  // }, []);

  //---CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
      return setOpenError(true),setError("Установите MetaMask"), router.push("/connectWallet");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setOpenError(true),setError("Ошибка во время подключения к кошельку");
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setOpenError(true),setError("Ошибка при загрузке в IPFS");
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, author, authorpost, recipient, image, description, router, website, userData, category, collectionName, organization) => {
    if (!name || !description || !image || !author || !authorpost || !organization || !recipient|| !category)
      return setOpenError(true),setError("Вы указали не все данные");
      const wallet = userData.walletAdress;
      const nftData = await dispatch(fetchPostNFT({walletAdressCreator: wallet}))
      const id = nftData?.payload?.data?.nft?._id;
      if (!nftData.payload)
      return setOpenError(true),setError("Что-то пошло не так при загрузки NFT в базу данных платформы");

    const data = JSON.stringify({ name, author, authorpost, recipient, description, image, website, category, collectionName, organization, id });
    if (!wallet)
    return setOpenError(true),setError("Ошибка получения данных перезагрузите страницу и попробуйте снова");

    if (currentAccount != wallet)
    return setOpenError(true),setError("Адрес подключенного кошелька не совпадает с тем, что указан в профиле");

    try {
      const added = await client.add(data);

      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      const contract = await connectingWithSmartContract();

      // const mintPrice = await contract.getMintingPrice();

      const signData = await dispatch(fetchSignNFT());
      let mesHash = signData.payload.data.messageHash;
      let sign = signData.payload.data.signature;

      if (!mesHash || !sign)
      return setOpenError(true),setError("Что-то пошло не так при получении подписи для минта NFT");

      const transaction = await contract.createToken(url, mesHash, sign/*, {value: mintPrice.toString()}*/)

      await transaction.wait();
      router.push({pathname: "/author", query: userData});
    } catch (error) {
      setOpenError(true),setError("Ошибка при создании NFT");
    }
  };

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type, currentwallet) => {
    try {
      if (currentwallet) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed(currentwallet)
            : type == "fetchMyNFTs" ? await contract.fetchMyNFTs(currentwallet)
            : await contract.fetchMyHideNFTs();
            console.log("second", data);
        const items = await Promise.all(
          data?.map(
            async ({ tokenId, creator, owner, hide}) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, author, authorpost, organization, recipient, description, category, collectionName, website,},
              } = await axios.get(tokenURI);
              return {
                tokenId: tokenId.toNumber(),
                creator,
                owner,
                hide,
                image,
                name,
                author, 
                authorpost, 
                organization,
                recipient,
                description,
                category,
                tokenURI,
                collectionName,
                website,
              };
              
            }
          )
        );
        return items;
      }
    } catch (error) {
      setOpenError(true),setError('Ошибка при получении NFT, если вы не подключены, нажмите "Подключиться"');
    }
  };

  const makeHideOrUnhide = async(newState, id, userData) => {
    try {
      const contract = await connectingWithSmartContract();

      const transaction = await contract.makeHideOrUnhide(newState, id);
      await transaction.wait();
      router.push({pathname: "/author", query: userData});
    }catch (error) {
      setOpenError(true),setError('Ошибка при изменении состояния NFT');
    }
  }

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //---BUY NFTs FUNCTION
  const makeTransferToken = async (adress, id) => {
    try {
      const contract = await connectingWithSmartContract();

      const transaction = await contract.transferToken(adress, id);

      await transaction.wait();
    } catch (error) {
      setOpenError(true),setError("Ошибка во время отправки NFT");
    }
  };
  //authMe
  useEffect(()=> {
    dispatch(fetchAuthMe());
  }, []);

  // logout
  const userLogut = () => {
      dispatch(logout());
      window.localStorage.removeItem("token");
  }

  return (
    <NFTDocumentsContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchMyNFTsOrListedNFTs,
        makeTransferToken,
        currentAccount,
        setOpenError,
        openError,
        error,
        setError,
        userLogut,
        logoutNotice,
        openlogoutNotice,
        setlogoutNotice,
        setOpenlogoutNotice,
        makeHideOrUnhide,
      }}
    >
      {children}
    </NFTDocumentsContext.Provider>
  );
};