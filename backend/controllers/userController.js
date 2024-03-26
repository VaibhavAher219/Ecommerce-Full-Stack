const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto')
//Regsiter

exports.registerUser = catchAsyncErrors (async(req,res,next)=>{
    const{name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar : {
            public_id : "Smaple",
            url : "Smaple"
        },

    });

    sendToken(user,201,res);

})

//login

exports.loginUser= catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body ; 
    if(!email || !password){
        return next(new ErrorHandler("Please Enter EMail pass",400))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler("Not found your mail",400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Pass or Mail",401))
    }
    sendToken(user,200,res);

})

//logou

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('Token', null ,{
        httpOnly : true,
        expires : new Date(Date.now()+0)
    })
   

    res.status(200).json({
        success:true,
        message: "log out succesful"
    })
    const token  = req.cookies;
    console.log(token)
})

//forget

exports.forgotPassword= catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404))

    }
    //get resettoken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is \n\n ${resetPasswordUrl}`
    try{
        await sendEmail({
            email:user.email,
            subject:"Password Recovery",
            message,
        })
        res.status(200).json({
            success:true,
            message : `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))

    }

})

exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken =  crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user= await User.findOne({resetPasswordToken,resetPasswordExpire:{
        $gt:Date.now()
    }})

    if(!user){
        return next(new ErrorHandler("Token invalid or expires",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Does not match",400))


    }

    user.password=req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);



})


exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
  
    const user = await User.findById(req.User.id);
    res.status(200).json({
        success:true,
        user
    })

}
    
)