const {Router}=require("express");
const {handleSignup,handleLogin}=require("../controllers/user");
const router=Router();
router.get("/login",(req,res)=>{
    res.render("login");
});
router.post("/login",handleLogin);
router.get("/signup",(req,res)=>{
    res.render("signup");
});
router.post("/signup",handleSignup);
router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
});
module.exports=router;