import mongoose from "mongoose";

const { Schema } = mongoose;

const userProfileSchema = new Schema(
  {
    bio : {type:String},
    // profile_picture : {type:String,unique:true},
    location : {type:String},
    date_of_birth : {type:Date},
    gender : {type:String,enum: ['Male', 'Female']},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
    },
  }
)

export const UserProfile = mongoose.model('userProfile', userProfileSchema);

