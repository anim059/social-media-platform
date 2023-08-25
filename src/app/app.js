import userConfig from "./user/userController.js";
import  userProfileConfig  from "./user-profile/userProfileController.js";
import userConnectionConfig from "./user-connection/userConnectionController.js";
import userContentConfig from "./user-post/userPostController.js";

const appConfiguration = (app) =>{
    userConfig(app);
    userProfileConfig(app);
    userConnectionConfig(app);
    userContentConfig(app);
}

export default appConfiguration;