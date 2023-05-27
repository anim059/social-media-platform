import mongoose from "mongoose";

const { Schema } = mongoose;

const privacySettingSchema = new Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPublic: {
        type: Boolean,
        default: false
      },
    isFriendsOnly: {
        type: Boolean,
        default: true
    },
})

export const PrivacySetting = mongoose.model('privacySetting', privacySettingSchema);



