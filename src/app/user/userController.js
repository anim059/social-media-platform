import express from 'express';
import { saveUserInfo,saveUserPassword,getUserInfo } from './userService.js'; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

const userLogin = async (req,res) =>{
    try {
        console.log(req.body);
        const {email,password} = req.body;
        if(!password || !email){
            res.status(400).send({
                message : "necessary field"
            })
        }
        //const isPasswordValid = await bcrypt.hash(password, 10);
        const userModel = await getUserInfo(email);
        console.log("userModel",userModel);
        if(userModel){
            const hashpassword = userModel.password;
            const isPasswordValid = await bcrypt.compare(password, hashpassword);
            if(isPasswordValid){
                const jwtoken = jwt.sign({
                    email: userModel.email,password:password
                  }, 'secret_key', { expiresIn: 60 });
                console.log(jwtoken);
                res.status(200).send({
                    data : jwtoken,
                    message : "login",
                    status : "success"
                })
            }else{
                res.status(403).send({
                    message : "Authintication error"
                })
            }
        }
    } catch (error) {
        res.status(403).send({
            message : "err" + error
        })
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
            res.status(400).send({
                message : "Password validation error"
            })
        }else{
            const {email,password} = req.body;
            console.log(password);
            const hashPassword = await bcrypt.hash(password, 10);
            console.log(hashPassword);
            if(hashPassword){
                const userModel = await saveUserPassword(email,hashPassword);
                console.log(userModel);
                res.status(200).send({
                    message : "submitted successfully"
                })
            }
        }
    } catch (error) {
        console.log("error"+error.message);
        res.status(400).send({
            message : error.message
        })
    }
}


userRouter.get('/');
userRouter.post('/registration',userRegistration);
userRouter.post('/login',userLogin);
userRouter.put('/changePassword',changePassword);
userRouter.delete('/');

const userConfiguration = (app) => {
    app.use('/user',userRouter)
}

export default userConfiguration;