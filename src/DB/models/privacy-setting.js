import mongoose from "mongoose";

const { Schema } = mongoose;

const privacySettingSchema = new Schema(
    {
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isPublic: {
        type: Boolean,
        default: true
      },
    isFriendsOnly: {
        type: Boolean,
        default: false
    },
}
)

export const PrivacySetting = mongoose.model('privacySetting', privacySettingSchema);



