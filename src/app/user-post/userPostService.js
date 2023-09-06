import models from "../../DB/index.js";

export const createUserPost = async(loggedInUserId, content) => {
    const user = await models.User.findById({_id:loggedInUserId});
    if(!user){
        return null;
    }
    const newPost = new models.UserPosts({ content, author: loggedInUserId });
    const savedPost = newPost.save();
    return savedPost;
}

export const updateUserPost = async(postId, content) => {
    try{
        const post = await models.UserPosts.findById({_id : postId});
        if(!post){
            return null;
        }
        post.content = content
        const savedPost = post.save();
        return savedPost;
    }catch(err){

    }
}