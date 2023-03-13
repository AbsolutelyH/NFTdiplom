const ethers = require('ethers');
const User = require("../models/userModel");
const AppError = require("../Utils/appError")
const catchAsync = require("../Utils/catchAsync");


// //USER NFT CREATION VALIDATION
// exports.signNFT catchAsync(async(req, res, next) => {
//     await User.findById(req.body.id);
//     if(User.role === creator){
//         const cotractOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
//         const ownerPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
//         const 
//     }else {
//         return next(new AppError("У вас нет права создавать NFT"));
//     }
// });