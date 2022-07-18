const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");




const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
 res.send('app runing on port 3000 succefully')
})


app.post('/send/mail', (req, res) => {
    
    let email = req.body.email;
    let subject = req.body.subject;
    let text = req.body.text;

    async function main() {
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
         service: 'gmail', 
          auth: {
            user: 'syleyeghele@gmail.com',
            pass: 'yycfshydwfoknmxj', 
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"syleyeghele" <syleyeghele@gmail.com>', // sender address
          to: email,   // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body
          //html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      main().catch(console.error);

})



app.listen(3000, (req, res) => {
    console.log('server is running')
})