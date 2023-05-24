import models from '../../DB/index.js';

export const saveUserInfo = async (reqBody) => {
    const user = new models.User(reqBody);
    const saveUser = user.save();
    return saveUser;
}

export const saveUserPassword = async (uemail,upassword) => {
    console.log("uemail",uemail);
    const user = await models.User.findOneAndUpdate({email:uemail},{password:upassword});
    console.log("user",user);
    return user;
}

export const getUserInfo = async (uemail) => {
    console.log("uemail",uemail);
    const user = await models.User.findOne({email:uemail});
    return user;
}