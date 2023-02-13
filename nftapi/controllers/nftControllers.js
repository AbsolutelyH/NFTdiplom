exports.getAllNfts = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
    });
  };
  //POST METHOD
  exports.createNFT = async (req, res) => {
    // const newNFT = new NFT({})
    // newNFT.save();
    const newNFT = await NFT.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        nft: newNFT
      }
    });
  };
  // GET SINGLE NFT
  exports.getSingleNFT = (req, res) => {
    const id = req.params.id * 1;
    
    res.status(200).json({
      status: "success",
    });
  };
  //PATCH METHOD
  exports.updateNFT = (req, res) => {
  };
  //DELET METHOD
  exports.deleteNFT = (req, res) => { 
    res.status(204).json({
      status: "success",
      data: null,
    });
  };