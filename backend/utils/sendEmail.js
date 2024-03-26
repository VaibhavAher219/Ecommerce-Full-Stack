const nodeMailer = require('nodemailer');
const sendEmail = async (options)=>{
    const transporter= nodeMailer.createTransport({
        service :process.env.SMPT_service,
        host:"smtp.gmail.com",
        PORT:465,
        auth:{
            user:"vazzy7913@gmail.com",
            pass:"vcshlxgqekenojjn"


        }
    })
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(
        mailOptions
    )

  
}





module.exports  = sendEmail;