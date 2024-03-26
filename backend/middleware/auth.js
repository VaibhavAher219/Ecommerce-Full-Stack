const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const token  = req.cookies;
    if(!token.Token){
        return next(new ErrorHandler("Please Login to access",401));
    }
    const decodedData= jwt.verify(token.Token,process.env.JWT_SECRET);
    // console.log(decodedData)
    req.User= await User.findById(decodedData.id);
    next();


})

exports.authorizedRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.User.role)){
           return next (new ErrorHandler("Not Authorized as Admin", 403));            
        }
        next();


    }
}

