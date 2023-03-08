const hre = require("hardhat");

async function main() {
  const NFTDocuments = await hre.ethers.getContractFactory("NFTDocuments");
  const nftDocuments = await NFTDocuments.deploy();

  await nftDocuments.deployed();

  console.log(` deployed contract Address ${nftDocuments.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
