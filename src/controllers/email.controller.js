const nodemailer = require('nodemailer');
const utilEmail = require('../utils/EmailTemplate');

const transport = {
    //this is the authentication for sending email.
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    //create a .env file and define the process.env variables with your credentials.
    auth: {
        user: "opemsas@gmail.com",
        pass: "gokqjwuumeilnxvy",
    },
}

const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
    if (error) {
        console.error(error)
    } else {
        console.log('Ready to send mail!')
    }
})

exports.get = (req, res, next) => {
    res.status(200).json({ msg: 'Working' })
}

exports.send = (req, res, next) => {

    const { to } = req.body
    const mail = {
        from: "Optimizacion Empresarial - OPEM SAS",
        to: to,
        subject: 'Informacion OPEM SAS',
        text: "",
        attachments: [{
            filename: 'seguridad.png',
            path: './src/assets/seguridad.png',
            cid: 'logo'
        }],
        html: utilEmail.contentEmail(req.body)
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail',
            })
        } else {
            res.json({
                status: 'success',
            })
        }
    })
}