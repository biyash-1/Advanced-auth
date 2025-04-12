import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    unique:true
},
name:{
    type:String,
    require:true
},
lastlogin:{
    type:Date,
    default: Date.now()
},
isverified:{
    type:Boolean,
    default:false
},

resetPasswordToken:String,
resetPasswordExpiresAt: String,
verificationToken:String,
verificationTokenExpiresAt:String
})

export default mongoose.model("User", userSchema);
