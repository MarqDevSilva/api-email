if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const port = 6000

user = process.env.USER
pass = process.env.PASS

app.get('/send', (req, res) => {

    const transporte = nodemailer.createTransport({
        host: "smtp.umbler.com",
        port: 587,
        auth:{ user, pass }
    })

    transporte.sendMail({
        from: user,
        to: "douglas.tecnico.info@gmail.com",
        replayTo: "oultimoelias@gmail.com",
        subject: "Sua inscrição foi confirmada",
        text: "Olá, recebemos sua inscrição"
    }).then(info=> {
        res.send(info)
    }).catch(error=> {
        res.send(error)
    })
})

app.listen(port, () => console.log(`Runnig on port ${port}!`))