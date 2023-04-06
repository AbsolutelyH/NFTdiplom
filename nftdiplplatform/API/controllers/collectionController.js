const COLLECTION = require("./../models/collectionModel");
const APIFeatures = require("../Utils/apiFeatures");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

//GET METHODS
exports.getMyCollections = catchAsync(async (req, res) => {
    const mYcollections = await COLLECTION.find({walletAdressCreator: req.body.walletAdressCreator});
    res.status(200).json({
      status: "success",
      results: mYcollections.length,
      data: {
        mYcollections,
      },
    });
  });

  exports.getALLCollections = catchAsync(async (req, res) => {
    const collections = await COLLECTION.find();
    res.status(200).json({
      status: "success",
      results: collections.length,
      data: {
        collections,
      },
    });
  });
  

  exports.getCollection = catchAsync(async (req, res) => {
    const mYcollections = await COLLECTION.findOne({nameOfcoll: req.body.nameOfcoll});
    res.status(200).json({
      status: "success",
      data: {
        mYcollections,
      },
    });
  });

//POST METHOD
exports.createCollection = catchAsync(async (req, res, next) => {
    const newCollection = await COLLECTION.create(req.body);
    res.status(201).json({
          status: "success",
          data: {
            collection: newCollection,
          },
       });
  });

//PATCH METHOD
exports.updateCollection = catchAsync(async(req, res, next) => {
    const coll = await COLLECTION.findById(req.params.id)
    if(coll.walletAdressCreator != req.user.walletAdress){
      return next(
        new AppError("Обновлять может только создатель", 400)
      );
    }
    const filteredBody = filterObj(req.body, "nameOfcoll", "background", "photo");
    const updateCollection = await COLLECTION.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if(!updateCollection) {
        return next(new AppError("Коллекции с таким идентификатором не найдено", 404));
      }
      console.log(req.user);
    res.status(200).json({
      status: "success",
      data: {
        updateCollection,
      },
    });
  });