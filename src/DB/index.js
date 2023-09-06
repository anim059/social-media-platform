import User from "./models/user.js";
import { UserProfile } from "./models/userProfile.js";
import { PrivacySetting } from "./models/privacy-setting.js";
import FriendReq from "./models/friendRequest.js";
import UserFriendList from "./models/user-friendlist.js";
import UserPosts from "./models/user-post.js";

const models = {
    User,
    UserProfile,
    PrivacySetting,
    FriendReq,
    UserFriendList,
    UserPosts
}

export default models;