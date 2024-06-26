const sendToken = (user,statuscode,res)=>{
    const token = user.getJWTToken();
//options for cookie
const options = {
    httpOnly:true,
    expires : new Date(
        Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
    ),
}
res.status(statuscode).cookie("Token", token,options).json({
    success:true,
    user,
    token
})}
module.exports = sendToken ; 