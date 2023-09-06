import express  from "express"
import { createUserPost, updateUserPost } from "./userPostService.js";
import appLocalVariable from "../../config/appLocal.js";

const userContentRouter = express.Router();

const postContent = async(req, res, next) => {
    try{
        const loggedInUserId = appLocalVariable.locals.userId;
        const { content } = req.body;
        if(!content){
            next({status:400,message:"Bad Request"})
        }
        const postModel = await createUserPost(loggedInUserId, content);
        console.log('postModel',postModel);
        
        res.status(200).send({
            message : "found",
            data:''
        })
    }catch(err){
        next({status:500,message:"Internal Server Error"})
    }
}

const updateContent = async(req, res, next) => {
    try{
        const postId = req.query.postId ? req.query.postId : ''
        const { content } = req.body;
        if(!content){
            next({status:400,message:"Bad Request"})
        }
        if(postId == ''){
            next({status:400,message:"Invalid Post Request"})
        }
        const postModel = await updateUserPost(postId, content);
        res.status(200).send({
            message : "found",
            data: postModel
        })
    }catch(err){
        console.log('err',err);
        
        next({status:500,message:"Internal Server Error"})
    }
}

const deleteContent = (req, res, next) => {
    
}

userContentRouter.post('/create', postContent);
userContentRouter.put('/update', updateContent);
userContentRouter.delete('/delete', deleteContent);

const userContentConfig = (app) => {
    app.use('/post', userContentRouter);
}

export default userContentConfig