const JWT=require("jsonwebtoken");
const secret="₹Mudra@$@)";   // very important 
function createToken(user){
    const  payload={
        _id:user._id,
        email:user.email,
        password:user.password,
        profilePic:user.profilePic,
        role:user.role
    };
    const token=JWT.sign(payload,secret);
    return token;
}
function validateToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
}
module.exports={
    createToken,
    validateToken
};