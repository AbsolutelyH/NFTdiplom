const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A NFT must have a name"],
      unique: true,
    },
    rating: Number,
    price: Number
  })
  
  const NFT = mongoose.model("NFT", nftSchema);

  module.exports.NFT;