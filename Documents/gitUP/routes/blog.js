const {Router}=require("express");
const{handleCreateNewBlog,handleGetBlog}=require("../controllers/blog");
const router=Router();
const multer=require("multer");
const path=require("path");
const commentUser=require("../models/comment");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,path.resolve("./public/uploads/"));
    },
    filename:function(req,file,cb){
        const fileName=`${Date.now()}-${file.originalname}`;
        return cb(null,fileName);
    },
});
const upload=multer({storage});
router.get("/new",(req,res)=>{
    return res.render("newBlog",{
        user:req.user
    });
})
router.get("/:id",handleGetBlog);
router.post("/new",upload.single("image"),handleCreateNewBlog);
router.post("/comment/:blogid",async (req,res)=>{
    const {comment}=req.body;
    const comment1=await commentUser.create({
        content:comment,
        blogId:req.params.blogid,
        createdBy:req.user._id
    });
    return res.redirect(`/blog/${req.params.blogid}`);
});
module.exports=router;