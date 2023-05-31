import models from '../../DB/index.js';

export const saveUserInfo = async (reqBody) => {
    const user = new models.User(reqBody);
    const saveUser = user.save();
    return saveUser;
}

export const saveUserPassword = async (uemail,upassword) => {
    //console.log("uemail",uemail);
    const user = await models.User.findOneAndUpdate({email:uemail},{password:upassword});
    //console.log("user",user);
    return user;
}

export const getUserInfo = async (uemail) => {
    //console.log("uemail",uemail);
    const user = await models.User.findOne({email:uemail});
    return user;
}

export const findUser = async (param='') => {
    let user;
    console.log("param",param);
    if(param === ''){
        user = await models.User.find();
        console.log("user",user);
    }else{
        user = await models.User.find({$or:[{firstName:{$regex:param}},{lastName:{$regex:param}}]});
        console.log("user 2",user);
    }

    return user;
}