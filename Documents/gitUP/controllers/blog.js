const Blog=require("../models/blog");
const Comment=require("../models/comment");

async function handleCreateNewBlog(req,res){
    const {title,body}=req.body;
    if(!title || !body ) return res.render("newBlog",{error:"Fill Data"});
    await Blog.create({
        title:title,
        body:body,
        coverImageURL:`/uploads/${req.file.filename}`,
        createdBy:req.user._id,
    });
    return res.redirect("/");
}
async function handleGetBlog(req,res){
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");
    res.render("blog",{
        getBlog:blog,
        user:req.user,
        comments
    });
}
module.exports={
    handleCreateNewBlog,
    handleGetBlog
};