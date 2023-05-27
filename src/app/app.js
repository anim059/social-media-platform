import userConfiguration from "./user/userController.js";
import  userProfileConfig  from "./user-profile/userProfileController.js";

const appConfiguration = (app) =>{
    userConfiguration(app);
    userProfileConfig(app);
}

export default appConfiguration;