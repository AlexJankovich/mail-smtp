const express = require('express')
const nodemailer = require("nodemailer");
const cors =require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3009

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// create reusable transporter object using the default SMTP transport

const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'


let transporter = nodemailer.createTransport({
    service:"gmail",

    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // requireTLS:true,
    auth: {
        user: `${smtp_login}`, // generated ethereal user
        pass: `${smtp_password}`, // generated ethereal password
    },
});

app.post('/sendMessage', async (req, res) => {


    let{email, name, message}=req.body
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${email}`, // sender address
        to: "mylo-box-27@yandex.ru", // list of receivers
        subject: "Test", // Subject line
        //text: "Test text", // plain text body
        html: `<b>From portfolio-page</b>
<div> contacts: ${email} </div>
<div>name: ${name}</div>
<div>${message}</div>`
, // html body
    });
     res.send('OK')

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})