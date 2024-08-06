const {createHmac,randomBytes}=require("crypto");
const {Schema,model}=require("mongoose");
const {createToken}=require("../services/auth");
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"images/default.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true});
// to hash passwords
userSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified)return;
    const salt=randomBytes(16).toString();
    const hashPassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
    this.salt=salt;
    this.password=hashPassword;
    next();
});
// // creating a virtual function on user
userSchema.static("matchPassandToken",async function(email,password){
    const user=await this.findOne({ email });
    if(!user)throw new Error('User Not Found');
    const salt=user.salt;
    const hash=user.password;
    const hashByUser=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(hash!==hashByUser) throw new Error("UserNotFound");
    const token=createToken(user);
    return token;
    // return hash===hashByUser;
});
const User=model("user",userSchema);
module.exports=User;