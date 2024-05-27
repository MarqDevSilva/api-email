if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const app = express()
const port = 6000

app.use(bodyParser.json());

user = process.env.USER
pass = process.env.PASS

app.post('/send', (req, res) => {

    const { to, replyTo, subject, html } = req.body.parametros;

    const transporte = nodemailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        auth:{ user, pass }
    })

    const mailOptions = {
        from: user,
        to: to,
        bcc: 'oultimoelias@gmail.com',
        replyTo: replyTo,
        subject: subject,
        html: html
    };

    transporte.sendMail(mailOptions)
        .then(info => {
            res.send(info);
        })
        .catch(error => {
            res.send(error);
        });
})

app.listen(port, () => console.log(`Runnig on port ${port}!`))