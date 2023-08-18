import mongoose from "mongoose";

const { Schema } = mongoose;

const FRSchema = new Schema({
    status : { type:String, enum: ["Pending","Accepted","Rejected"] },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiverId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const FriendReq = mongoose.model("FriendReq", FRSchema);

export default FriendReq;