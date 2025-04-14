const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'azizulhoq4305@gmail.com',
    pass: 'igidksaeqbnfqkeh',
  },
});
app.get('/resume', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(path.join(__dirname, 'public', 'Azizul-Hoq-Resume.pdf'));
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'azizulhoq4305@gmail.com',
    to: 'azizulsparktech@gmail.com', 
    subject: 'New Message from Contact Form',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error in sending email');
    }
    res.status(200).send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
