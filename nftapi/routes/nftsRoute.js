const express = require("express");
const nftControllers = require("./../controllers/nftControllers");

const router = express.Router();

// router.param("id", nftControllers.checkId);


//ROUTER NFTs
router.route("/").get(nftControllers.getAllNfts).post(nftControllers.createNFT);

router.route("/:id").get(nftControllers.getSingleNFT).patch(nftControllers.updateNFT).delete(nftControllers.deleteNFT);

module.exports = router;