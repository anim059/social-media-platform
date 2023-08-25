import express from 'express';
import { saveUserInfo,saveUserPassword,getUserInfo } from './userService.js'; 
import bcrypt from "bcrypt";
import createError from 'http-errors';
import jwt from "jsonwebtoken";


const userRouter = express.Router();

const userRegistration = async (req,res,next) =>{
    try {
        const {email,firstName,lastName,phone} = req.body;
       
        if(!email || !firstName || !lastName || !phone){
            next({status:400,message:"Bad Request"})
        }
        const userModel = await saveUserInfo(req.body);
        res.status(200).send({
            message : "submitted successfully"
        })
    } catch (error) {
        next({status:400,message:"Bad Request"})
    }
}

const userLogin = async (req,res,next) =>{
    try {
        const {email,password} = req.body;
        if(!password || !email){
            next({status:400,message:"Bad Request"})
        }
        const userModel = await getUserInfo(email);
        console.log("userModel",userModel)
        if(userModel){
            const hashpassword = userModel.password;
            const isPasswordValid = await bcrypt.compare(password, hashpassword);
            if(isPasswordValid){
                const jwtoken = jwt.sign({
                    email: userModel.email,password:password
                  }, 'secret_key', { expiresIn: 60*60 });
                
                res.status(200).send({
                    data : jwtoken,
                    message : "login",
                    status : "success"
                })
            }else{
                next({status:403,message:"Authintication error"});
            }
        }
        next({status:403,message:"InValid Loggin or Password"});
    } catch (error) {
        next({status:403,message:"Authintication error"})
    }
}

const checkPasswordValidation = (req) => {
    const {email,password,confirePassword} = req.body;
    const check1 = !password || !email || !confirePassword;
    const check2 = password !== confirePassword
    const check3 = confirePassword.length < 8;
    const check4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(confirePassword);

    return check1 || check2 || check3 || !check4;
}

const changePassword = async (req,res) => {
    try {
        if(checkPasswordValidation(req)){
            next({status:400,message:"Password validation error"})
        }else{
            const {email,password} = req.body;
            
            const hashPassword = await bcrypt.hash(password, 10);
           
            if(hashPassword){
                const userModel = await saveUserPassword(email,hashPassword);
                
                res.status(200).send({
                    message : "submitted successfully"
                })
            }
        }
    } catch (error) {
        next({status:400,message:"Bad Request"})
    }
}


userRouter.get('/');
userRouter.post('/registration',userRegistration);
userRouter.post('/login',userLogin);
userRouter.put('/changePassword',changePassword);
userRouter.delete('/');

const userConfiguration = (app) => {
    app.use('/',userRouter)
}

export default userConfiguration;