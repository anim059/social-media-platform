import express from 'express';
import { saveUserProfileInfo, getUserProfileInfo, updateUserProfileInfo} from './userProfileService.js';
import appLocalVariable from '../../config/appLocal.js'

const userProfileRouter = express.Router();


const profileInfo = async(req,res,next) => {
    try {
        const userId = appLocalVariable.locals.userId;
        console.log(userId);
        const userProfile = await getUserProfileInfo(userId);
        res.status(200).send({
            status : 'Success',
            data : userProfile
        })
    } catch (error) {
        return next({status:500,message:"Internal Server Error"});
    }
}

const postProfileInfo = async (req,res,next) => {
    try {
        const { bio, location, date_of_birth, gender} = req.body;
        const userId = appLocalVariable.locals.userId;
        if(!bio || !location || !date_of_birth || !gender){
            next({status:400,message:"Bad Request"});
        }
        if(!userId){
            return next({status:401,message:"Please Login Again"});
        }else{
            const userProfileId = await getUserProfileInfo(userId);
            if(!userProfileId){
                const userProfileModel = await saveUserProfileInfo({bio, location, date_of_birth, gender},userId); 
                res.status(200).send({
                    status : 'Success',
                    message : "submitted successfully",
                })
            }else{
                res.status(200).send({
                    status : 'Success',
                    message : "Already Available"
                })
            }
            
        }
    } catch (error) {
        return next({status:500,message:"Internal Server Error"});
    }
}

const updateProfileInfo = async(req,res,next) => {
    try {
        const { bio, location, date_of_birth, gender} = req.body;
        const userId = appLocalVariable.locals.userId;
        if(!bio || !location || !date_of_birth || !gender){
            next({status:400,message:"Bad Request"});
        }
        const userProfileInfo = await getUserProfileInfo(userId);
        if(userProfileInfo){
            const userProfile = await updateUserProfileInfo({bio, location, date_of_birth, gender},userId);
            res.status(200).send({
                status : 'Success',
                data : userProfile
            })
        }else{
            const userProfileModel = await saveUserProfileInfo({bio, location, date_of_birth, gender},userId); 
            res.status(200).send({
                status : 'Success',
                message : "submitted successfully",
            })
        }
    } catch (error) {
        return next({status:500,message:"Internal Server Error"});
    }
}


userProfileRouter.get('/',profileInfo);
userProfileRouter.post('/',postProfileInfo);
userProfileRouter.put('/',updateProfileInfo);

const userProfileConfig = (app) => {
    app.use('/user-profile',userProfileRouter)
}

export default userProfileConfig;