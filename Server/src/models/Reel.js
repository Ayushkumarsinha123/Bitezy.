import mongoose, { Mongoose } from "mongoose";
const reelSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      required : true
    } ,
    videoUrl: {
      type: String,
      required : true
    } ,
    caption : {
      type : String
    } ,
    restaurant: {
      type: Mongoose.Schema.Types.objectId,
      ref: "User"
    } ,
    like: {
      type : Number,
      default : 0
    }
  },
  {timestamps : true}
) 

export default mongoose.model("Reel", reelSchema);