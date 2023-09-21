const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const nftSchema = new mongoose.Schema({
    walletAdressCreator: {
      type: String,
    },
    url: {
      type: String,
    },
    secretNFT: {
      type: Boolean,
      default: false,
    },
  }, 
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

  // nftSchema.virtual("durationWeeks").get(function(){
  //   return this.duration / 7;
  // });
//MONGOOSE MIDDLEWARE

//DOCUMNT MIDDLEWARE: runs before .save() or .create()
// nftSchema.pre("save", function (next) {
//   // console.log(this);
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

//QYERY MIDDLEWARE
  // nftSchema.pre(/^find/, function (next) {
  //   this.find({ secretNft: { $ne: true } });
  //   this.start = Date.now();
  //   next();
  // });
  
  //-----post
  // nftSchema.post(/^find/, function (doc, next) {
  //   console.log(`Query took time: ${Date.now() - this.start} times`);
  //   // console.log(doc);
  //   next();
  // });
  
  //AGGREATION MIDDLEWARE
  // nftSchema.pre("aggregate", function (next) {
  //   this.pipeline().unshift({ $match: { secretNfts: { $ne: true } } });
  //   // console.log(this.pipeline());
  //   next();
  // });
  
  const NFT = mongoose.model("NFT", nftSchema);
  
  module.exports = NFT;
  