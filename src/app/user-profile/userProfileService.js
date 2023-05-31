import models from '../../DB/index.js'



export const getUserProfileInfo = async (userId) => {
    //console.log("uemail",uemail);
    const userProfile = await models.UserProfile.findOne({user:userId});
    return userProfile;
}

export const saveUserProfileInfo = async (reqBody,userId) => {
    const userProfile =  new models.UserProfile({...reqBody,user:userId});
    const userPrivacy = new models.PrivacySetting({user:userId}).save();
    const saveUserProfile =  userProfile.save();
    return saveUserProfile;
}

export const updateUserProfileInfo = async (reqBody,userId) => {
    const userProfile =  await models.UserProfile.findOneAndUpdate({user:userId},reqBody,{
        new: true
      });
    // const saveUserProfile =  userProfile.save();
    return userProfile;
}