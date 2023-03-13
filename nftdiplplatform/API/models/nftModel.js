const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const nftSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "A NFT must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "nft must have 40 character"],
      minlength: [5, "nft must have 5 character"],
    },
    slug: String,
    duration: {
      type: String,
      required: [true, "must provide duration"],
    },
    typeOfDoc: {
      type: String,
      required: [true, "must have typeOfDoc"],
      enum: {
        values: ["diplom", "certificate", "atestat"],
        message: "TypeOfDoc is either: diplom, certificate and atestat",
      },
    },
    rating: {
      type: Number,
      default: 4,
    },
    price: {
      type: Number,
      default: 1,
    },
    imageCover:{
      type: String,
      required: [true, "nust provide the cover imafe"],
    },
    images: [String],
    createdAT: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretNfts: {
      type: Boolean,
      default: false,
    },
    secretNfts: {
      type: Boolean,
      default: false,
    },
  }, 
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

  nftSchema.virtual("durationWeeks").get(function(){
    return this.duration / 7;
  });
//MONGOOSE MIDDLEWARE

//DOCUMNT MIDDLEWARE: runs before .save() or .create()
nftSchema.pre("save", function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QYERY MIDDLEWARE
  nftSchema.pre(/^find/, function (next) {
    this.find({ secretNfts: { $ne: true } });
    this.start = Date.now();
    next();
  });
  
  //-----post
  nftSchema.post(/^find/, function (doc, next) {
    console.log(`Query took time: ${Date.now() - this.start} times`);
    // console.log(doc);
    next();
  });
  
  //AGGREATION MIDDLEWARE
  nftSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secretNfts: { $ne: true } } });
    // console.log(this.pipeline());
    next();
  });
  
  const NFT = mongoose.model("NFT", nftSchema);
  
  module.exports = NFT;
  