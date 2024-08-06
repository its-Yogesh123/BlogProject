const {validateToken}=require("../services/auth");
function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){ 
            return next();
        }
        try {
            const payload=validateToken(tokenCookieValue);
            req.user=payload;
            return next();
        }catch(error){};
        return next();
    };
};
module.exports={
    checkForAuthentication,
};