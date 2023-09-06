import mongoose from "mongoose";

const { Schema } = mongoose;

const userFriendListSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        followers :[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        ],
        following :[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        ]
    },
    {
        timestamps : true
    }
)

const UserFriendList = mongoose.model("userFriendList",userFriendListSchema);

export default UserFriendList;