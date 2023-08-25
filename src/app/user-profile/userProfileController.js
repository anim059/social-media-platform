import express from 'express';


const userProfileRouter = express.Router();

const profileInfo = (req,res) => {
    //console.log(req);
    try {
        res.status(200).send({
            message : 'ok'
        })
    } catch (error) {
        console.log('catch');
        res.status(400).send({
            message : 'error'
        })
    }
}

userProfileRouter.get('/',profileInfo);

export const userProfileConfig = (app) => {
    app.use('/user-profile',userProfileRouter)
}