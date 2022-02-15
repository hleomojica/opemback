const nodemailer = require('nodemailer');
const utilEmail = require('../utils/EmailTemplate');

const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
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
    res.status(200).json({ msg: 'servicio trabajando' })
}

exports.send = (req, res, next) => {

    const { to, pdf } = req.body
    var adjuntopdf = {}
    if (pdf) {
        adjuntopdf = {
            filename: 'Certificado.pdf',
            contents: new Buffer(pdf.replace(/^data:pdf\/(pdf);base64,/, ''), 'base64')
        }
    }
    const mail = {
        from: "Optimizacion Empresarial - OPEM SAS",
        to: to,
        subject: 'Informacion OPEM SAS',
        text: "",
        attachments: [
            {
                filename: 'seguridad.png',
                path: './src/assets/seguridad.png',
                cid: 'logo'
            },
            adjuntopdf
        ],
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