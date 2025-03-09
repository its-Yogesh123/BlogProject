require("dotenv").config();
const http=require("http");
const PORT=process.env.PORT || 8000;   // it is for deploying it
const URL=process.env.MONGO_URL;
const express=require("express");
const path=require("path");
const router=require("./routes/user");
const blogRouter=require("./routes/blog");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const {checkForAuthentication}=require("./middlewares/auth");
const Blog=require("./models/blog");
const app=express();
// -- creating server
http.createServer(app);
// connection to MongoDB
mongoose.connect(URL)
.then(()=>{console.log("MongoDB Connected");});
// -- Middlewares
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use("/",router);
app.use("/blog",blogRouter);
// --- routes

app.get("",async(req,res)=>{
   try{
    const allBlog=await Blog.find({});
    return res.render('home',{
        user:req.user,
        blogs:allBlog,
    });
   }
   catch (err){
    return res.status(500).send("Soory Our Side error");
   }
});
app.listen(PORT,()=>{console.log("Server Started at : ",PORT);});
// means while only developing not at deploying time  (npm i nodemon -D)

