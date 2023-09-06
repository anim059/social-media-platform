import User from "./models/user.js";
import { UserProfile } from "./models/userProfile.js";
import { PrivacySetting } from "./models/privacy-setting.js";
import FriendReq from "./models/friendRequest.js";
import UserFriendList from "./models/user-friendlist.js";

const models = {
    User,
    UserProfile,
    PrivacySetting,
    FriendReq,
    UserFriendList
}

export default models;