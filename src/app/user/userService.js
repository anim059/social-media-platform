import models from '../../DB/index.js';

export const saveUserInfo = async (reqBody) => {
    const user = new models.User(reqBody);
    const saveUser = user.save();
    return saveUser;
}