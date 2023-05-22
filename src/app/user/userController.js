import express from 'express';
import { saveUserInfo } from './userService.js'; 

const userRouter = express.Router();

const userRegistration = async (req,res) =>{
    try {
        const {email,firstName,lastName,phone} = req.body;
        console.log(email);
        if(!email || !firstName || !lastName || !phone){
            res.status(400).send({
                message : "required necessary req body"
            })
        }
        const userModel = await saveUserInfo(req.body);
        res.status(200).send({
            message : "submitted successfully"
        })
    } catch (error) {
        console.log("error"+error.message);
        res.status(400).send({
            message : error.message
        })
    }
}

const userLogin = (req,res) =>{
    try {
        console.log(req);
        res.status(200).send({
            message : "ok"
        })
    } catch (error) {
        console.log(error);
    }
}

userRouter.get('/');
userRouter.post('/registration',userRegistration);
userRouter.post('/login',userLogin);
userRouter.put('/');
userRouter.delete('/');

const userConfiguration = (app) => {
    app.use('/user',userRouter)
}

export default userConfiguration;