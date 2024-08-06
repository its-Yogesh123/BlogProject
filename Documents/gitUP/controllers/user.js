const User=require("../models/user");
async function handleSignup(req,res){
    const body=req.body;
    if(!body.name || !body.email || !body.password)return res.render("signup",{error:"Fill All Fields"});
    if(body.password!==body.Cpassword) return res.render("signup",{error:"Password Not Match"});
    await User.create({
        name:body.name,
        email:body.email,
        password:body.password,
    });
    return res.redirect("/login");
}
async function handleLogin(req,res){
    const {email,password}=req.body;
    if(!email || !password )return res.json({msg:"No Body data"});
    try {
        const token=await User.matchPassandToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("login",{
            error:"User Not Found"
        });
    }
    
    // if(!user)return res.json({msg:"User Not Found"});
   
}
module.exports={
    handleSignup,
    handleLogin,
};