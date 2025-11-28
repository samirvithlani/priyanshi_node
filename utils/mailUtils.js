const mailer = require("nodemailer")

const mailSend = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            pass:"",
            user:"pythonforsamir@gmail.com"
        },
        
    })

    const mailOptions = {
        to:to,
        subject:subject,
        text:text,
        from:"pythonforsamir@gmail.com"
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)

}

//mailSend("samir.vithlani83955@gmail.com","test","test")
module.exports = {
    mailSend
}