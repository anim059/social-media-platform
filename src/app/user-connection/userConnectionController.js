import express from 'express';
import { sendFriendReq,updateFriendReq,rejectFriendReq,addToFriendList,getUserFriendReqList} from './userConnectionService.js'; 
import appLocalVariable from '../../config/appLocal.js'

const userConnectionRouter = express.Router();

const sendFriendReqToUser = async(req,res,next) => {
    try {
        const loggedInUserId = appLocalVariable.locals.userId;
        let FriendReqModel;
        let friendListModel;
        let message;
        const { friendId, status } = req.body;
        if(!friendId || !status){
            next({status:400,message:"Bad Request"})
        }
        if(status === "Pending"){
            FriendReqModel = await sendFriendReq(loggedInUserId, friendId, status);
            message = "friend req send";
        }else if(status === "Accepted"){
            FriendReqModel = await updateFriendReq(friendId, loggedInUserId, "Friend");
            friendListModel = await addToFriendList(friendId, loggedInUserId);
            message = "friend req accepted";
        }else if(status === "Rejected"){
            FriendReqModel = await rejectFriendReq(friendId, loggedInUserId);
            message = "friend req decline";
        }else if(status === "Blocked" || status === "Unfriend"){
            FriendReqModel = await updateFriendReq(friendId,loggedInUserId,status);
            message = "Unfriend or Blocked";
        }
       
        if(FriendReqModel || (status === "Accepted" && friendListModel)){
            res.status(200).send({
                status : 'Success',
                message
            })
        }else{
            next({status:500,message:"server error"})
        }
    } catch (error) {
        next({status:500,message:error})
    }
}

const getFriendReqList = async(req,res,next) => {
    try {
        const loggedInUserId = appLocalVariable.locals.userId;
        let reqList = await getUserFriendReqList(loggedInUserId);
        console.log(reqList);
        reqList = reqList.map((item)=>{
            return {status:item.status,firstName:item.senderId.firstName,lastName:item.senderId.lastName}
        });
        res.status(200).send({
            status : 'Success',
            data : reqList,
        })
    } catch (error) {
        next({status:500,message:error})
    }
}

userConnectionRouter.post("/friend_req", sendFriendReqToUser);
userConnectionRouter.get("/friend_req", getFriendReqList);

const userConnectionConfig = (app) =>{
    app.use('/',userConnectionRouter);
}

export default userConnectionConfig;