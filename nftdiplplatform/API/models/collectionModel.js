const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const collectionSchema = new mongoose.Schema({
    nameOfcoll: {
      type: String,
      required: [true, "Пожалуйста укажите название коллекции"],
      unique: true,
      trim: true,
      maxlength: [40, "Длинна названия максимум 40 символов"],
      minlength: [5, "Минимальная длинна названия 5 символов"],
    },
    createdAT: {
      type: Date,
      default: Date.now()
    },
    walletAdressCreator: {
        type: String,
        required: [true, "Пожалуйста, укажите адрес"],
    },
    background: {
        type: String,
    },
    photo: {
        type: String,
    },
    about: {
      type: String,
  },
  }, 
);
  
  const COLLECTION = mongoose.model("COLLECTION", collectionSchema);
  
  module.exports = COLLECTION;