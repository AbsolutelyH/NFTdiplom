const express = require("express");
const collectionController = require("./../controllers/collectionController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").post(authController.protect, authController.restrictTo("admin", "creator"), collectionController.createCollection);

router.route("/MyCollections").post(authController.protect, collectionController.getMyCollections);
router.route("/AllCollections").get(collectionController.getALLCollections);
router.route("/OneCollection").post(collectionController.getCollection);

router.route("/UpdateCollection").patch(authController.protect, collectionController.updateCollection);


module.exports = router;