import jwt from "jsonwebtoken";
import models from "../DB/index.js";
export const authenticateMiddleware = (req,res,next) => {
    if(req.originalUrl === '/login'){
        next();
    }else{
        try {
            if(req.headers.authorization){
                const authorizationToken = req.headers.authorization.split(' ')[1];
           
                const jwtoken = jwt.verify(authorizationToken,'secret_key');
            
                const user = models.User.findOne({email:jwtoken.email});
            
                
                if(!user){
                    const errorRes = {status:403,message:"authorization error"};
                    return next(errorRes);
                }
            }else{
                const errorRes = {status:403,message:"authorization error"};
                return next(errorRes);
            }
            next();
        } catch (error) {
            //console.log('err',error.name);
            const errorRes = {status:401,message:"token expired"};
            return next(errorRes);
        }
        
    }
}