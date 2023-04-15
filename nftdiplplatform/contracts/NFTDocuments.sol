// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTDocuments is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // uint256 mintPrice = 2 ether;
    address payable owner;

    mapping(uint256 => PlatformItem) private idToPlatformItem;

    struct PlatformItem {
        uint256 tokenId;
        address creator;
        address owner;
    }

    // event PlatformItemCreated(
    //     uint256 indexed tokenId,
    //     address creator,
    //     address owner
    // );

    // modifier onlyOwner() {
    //     require(
    //         msg.sender == owner,
    //         "only owner of the platform can change the mint price"
    //     );
    //     _;
    // }

    constructor() ERC721("NFT Documents", "ND") {
        owner = payable(msg.sender);
    }
    // // will accept the hashed authorized wallet address and signature as arguments and output the address of the signatory
    function recoverSigner(bytes32 hash, bytes memory signature) public pure returns (address) {
        bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        return ECDSA.recover(messageDigest, signature);
    }

    /* Updates the mint price of the contract */
    // function updateMintPrice(uint256 _mintPrice)
    //     public
    //     payable
    // {
    //     require(
    //         owner == msg.sender,
    //         "Only platform owner can update mint price."
    //     );
    //     mintPrice = _mintPrice;
    // }

    /* Returns the mint price of the contract */
    // function getMintingPrice() public view returns (uint256) {
    //     return mintPrice;
    // }

    // let create nft token
    function createToken(string memory tokenURI, bytes32 hash, bytes memory signature)
        public
        payable
        returns (uint256)
    {
        require(recoverSigner(hash, signature) == owner, "Address is not allowlisted");
        // require(msg.value == mintPrice, "Transaction value did not equal the mint price");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createPlatformItem(newTokenId);
        return newTokenId;
    }

    function createPlatformItem(uint256 tokenId) private {
        idToPlatformItem[tokenId] = PlatformItem(
            tokenId,
            msg.sender,
            msg.sender
        );
        
        // emit PlatformItemCreated(
        //     tokenId,
        //     msg.sender,
        //     msg.sender
        // );                
    }

    function transferToken(address to, uint tokenId) public {
        require(idToPlatformItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(to != address(0), "transfer to zero address");
        idToPlatformItem[tokenId].owner = to;

        _transfer(msg.sender, to, tokenId);
    }

    /* Returns only items that a user owns */
    function fetchMyNFTs(address currentAccount) public view returns (PlatformItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToPlatformItem[i + 1].owner == currentAccount) {
                itemCount += 1;
            }
        }

        PlatformItem[] memory items = new PlatformItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToPlatformItem[i + 1].owner == currentAccount) {
                uint256 currentId = i + 1;
                PlatformItem storage currentItem = idToPlatformItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has created */
    function fetchItemsListed(address currentAccount) public view returns (PlatformItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToPlatformItem[i + 1].creator == currentAccount) {
                itemCount += 1;
            }
        }

        PlatformItem[] memory items = new PlatformItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToPlatformItem[i + 1].creator == currentAccount) {
                uint256 currentId = i + 1;
                PlatformItem storage currentItem = idToPlatformItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

}