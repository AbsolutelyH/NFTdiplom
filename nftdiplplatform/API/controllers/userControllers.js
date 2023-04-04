const User = require("./../models/userModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
// const multer = require("multer");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


//   const storage = multer.diskStorage({
//     destination: (_, __, cd) => {
//       cd(null, 'uploads');
//     },
//     filename:(_, file, cd) => {
//       cd(null, file.originalname);
//     }, 
//   });
  
//   const upload = multer({storage});
 



// //UPLOADING IMAGES
// exports.uploadImage = upload.single('image'),async(req, res) => {
//   let name = await(req.file.originalname);
//   res.status(200).json({
//     status: "success",
//     data: {
//       url: `/uploads/${name}`,
//     },
//   });
// };

exports.updateMe = catchAsync(async(req, res, next) => {
  if(req.body.password || req.body.passwordConfirm){
    return next(
      new AppError("Это не для обновления пароля, используйте /updateMyPassword.", 400)
    );
  }
  const filteredBody = filterObj(req.body, "name", "about", "website", "vk", "telegram", "youtube", "photo", "background");
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});


exports.updateVUser = catchAsync(async(req, res, next) => {
  if(req.body.password || req.body.passwordConfirm){
    return next(
      new AppError("Это не для обновления пароля, используйте /updateMyPassword.", 400)
    );
  }
  const filteredBody = filterObj(req.body, "name", "post", "role", "organization" );
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async(req, res, next) => {
  await User.findByIdAndUpdate(req.body.id, {
    active: false,
  });
  res.status(204).json({
    status: "Success",
    data: null,
  });
});

//------USERS
exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    // /SEND QUERY
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  });

  exports.getUserByWallet = catchAsync(async (req, res, next) => {
    const user = await User.findOne({walletAdress: req.body.walletAdress});
    if(!user) {
      return next(new AppError("Пользователь не найден", 404));
  }
    // /SEND QUERY
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  });
  
  exports.createUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  
  exports.getSingleUser = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
      return next(new AppError("No nft found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  });
  
  exports.updateUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
  
  exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };