import models from '../../DB/index.js';


export const sendFriendReq = async (senderId,receiverId,status) => {
    const reqBody = {
        status,
        senderId,
        receiverId
    }
    const FriendReq = new models.FriendReq(reqBody);
    const saveFriendReq = await FriendReq.save();
    return saveFriendReq;
}

const removeConnection = async ( firstUserId, secondUserId )=>{
    let user = await models.UserFriendList.findOne({ user:firstUserId });
    console.log('user 3',user);
    
    if(user){
        user.followers.pull({ _id: secondUserId });
        user.following.pull({ _id: secondUserId });
    }else{
        // user = new models.UserFriendList({user:userId,followers:[senderId],following:[userId]});
    }
    await user.save();
    return user;
}

export const updateFriendReq = async ( friendId, loggedInUserId, status ) => {
    let FriendConnection;
    if(status === "Blocked" || status === "Unfriend"){
        let user = await removeConnection( loggedInUserId, friendId );
        let senderUser = await removeConnection( friendId, loggedInUserId ); 
    }
    FriendConnection = await models.FriendReq.findOneAndUpdate({$or:[
        {senderId:friendId,receiverId:loggedInUserId},
        {senderId:loggedInUserId,receiverId:friendId}
    ]},{status:status});
    return FriendConnection;
}

export const rejectFriendReq = async ( senderId, receiverId, status ) => {
    const FriendReq = await models.FriendReq.findOneAndDelete({senderId:senderId,receiverId:receiverId});
    //console.log("FriendReq",FriendReq);
    return FriendReq;
}

const makeConnection = async ( firstUserId, secondUserId )=>{
    let user = await models.UserFriendList.findOne({user:firstUserId});
    console.log('user 3',user);
    
    if(!user){
        console.log('secondUserId',secondUserId);
        user = new models.UserFriendList({user:firstUserId,followers:[secondUserId],following:[secondUserId]});
    }else{
        user.followers.push(secondUserId);
        user.following.push(secondUserId);
    }
    await user.save();
    return user;
}

export const addToFriendList = async ( friendId, loggedInUserId ) => {
    
    let user = await makeConnection(loggedInUserId,friendId);
    let senderUser = await makeConnection(friendId,loggedInUserId);
    // if(user && senderUser){
    //     return user;
    // }
    return user;
}

export const getUserFriendReqList = async ( loggedInUserId ) => {
    const friendReq = await models.FriendReq.find({
        $and : [
            {status:"Pending"},
            {receiverId:loggedInUserId}
        ]
    }).populate('senderId');
    return friendReq;
}