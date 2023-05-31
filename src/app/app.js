import userConfiguration from "./user/userController.js";
import  userProfileConfig  from "./user-profile/userProfileController.js";
import userConnectionConfig from "./user-connection/userConnectionController.js";

const appConfiguration = (app) =>{
    userConfiguration(app);
    userProfileConfig(app);
    userConnectionConfig(app);
}

export default appConfiguration;