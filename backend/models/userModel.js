const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const dotenv = require ('dotenv');
const crypto = require('crypto')

const jwt =require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Cannot exceed 30"],
        minLength:[4,"Very Small name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Mail"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid mail"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Pass"],
        select:false,
        minLength:[4,"Gt than 4 char"],
    },
    avatar:{
        
            public_id:{
                type:String
            },
            url:{
            type:String,
            required : [true,'please enter image url'],}   
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date


    
})
userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})

//JWT TOken

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_expire
    })
}
//comp pass

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

//forget password token

userSchema.methods.getResetPasswordToken =function (){
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hash and add to user schema
    this.resetPasswordToken =  crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+ 15*60*1000
    return resetToken;
}



module.exports = mongoose.model("User",userSchema)


