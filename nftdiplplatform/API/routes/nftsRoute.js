const express = require("express");
const nftControllers = require("./../controllers/nftControllers");
const authController = require("../controllers/authController");

const router = express.Router();

//TOP NFTS BY PRICE
router
  .route("/top-5-nfts")
  .get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts);

//STATS ROUTE
// router.route("/nfts-stats").get(nftControllers.getNFTsStats);

//ROUTER NFTs
router.route("/").get(nftControllers.getAllNfts).post(nftControllers.createNFT);
router.route("/MyNFTs").post(nftControllers.MyNFTs)
//GET MONTHLY PLAN
// router.route("/monthly-plan/:year").get(nftControllers.getMonthlyPlan);

router.route("/").post(nftControllers.createNFT);

router
.route("/:id")
.get(nftControllers.getSingleNFT)
.patch(nftControllers.updateNFT)
.delete(authController.protect, authController.restrictTo("admin", "guide"), 
nftControllers.deleteNFT);

module.exports = router;