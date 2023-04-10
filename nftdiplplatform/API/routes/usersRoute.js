const express = require("express");
const userControllers = require("./../controllers/userControllers");
const authController = require("../controllers/authController");
const multer = require("multer");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/getAuthNFT", authController.protect, authController.signNFT);
router.get("/authMe", authController.protect, authController.authMe);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updateMyPassword", authController.protect, authController.updatePassword);
router.patch("/updateMe", authController.protect, userControllers.updateMe);
router.delete("/deleteMe", authController.protect, userControllers.deleteMe);

router.patch("/updateVUser", authController.protect, userControllers.updateVUser);

router.post("/getUserByWallet",userControllers.getUserByWallet);

//ROUTERS USERS
router.route("/")
.get(userControllers.getAllUsers)
.post(userControllers.createUser);

router.route("/:id")
  .get(userControllers.getSingleUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);
//UPLOAD IMG
  const storage = multer.diskStorage({
    destination: (_, __, cd) => {
      cd(null, 'uploads');
    },
    filename:(_, file, cd) => {
      cd(null, file.originalname);
    }, 
  });
  
  const upload = multer({storage});  

  router.post("/upload", authController.protect, upload.single('image'), (req, res) => {
    res.status(200).json({
      status: "success",
      data: {
        url: `/uploads/${req.file.originalname}`,
      },
    });
  });

module.exports = router;