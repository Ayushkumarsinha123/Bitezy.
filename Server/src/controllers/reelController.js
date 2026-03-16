import Reel from "../models/Reel";

export const getAllReels = async(req, res) => {
  try {
    const reels = await Reel.find()
    .populate("restaurant", "name picture")
    .sort({createdAt: -1});
    res.status(200).json(reels);
  } catch(error){
    res.status(500).json({message: "failed to fetch reels"},error)
  }
}