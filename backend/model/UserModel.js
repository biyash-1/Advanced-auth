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
resetPasswordExpiresAt: Date,
verificationToken:String,
verificationTokenExpiresAt:Date
})

export default mongoose.model("User", userSchema);
