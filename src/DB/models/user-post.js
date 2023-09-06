import mongoose from "mongoose";

const { Schema } = mongoose;

const userPostSchema = new Schema (
    {
        content : { type: String },
        author : { type : mongoose.Schema.Types.ObjectId, ref : 'user'}
    },
    { timestamps : true }
);

const UserPosts = mongoose.model('Posts', userPostSchema);

export default UserPosts;

