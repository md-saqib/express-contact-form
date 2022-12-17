const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/contact", (req, res) => {
  // Extract the form data from the request body
  const { name, email, message } = req.body;

  // Set up the email transport using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gaston.emmerich17@ethereal.email", // generated ethereal user
      pass: "tAfqB2zH68GH3AuCyK", // generated ethereal password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `${name} <${email}>`,
    to: "mdsaqib108@gmail.com", // Change this to your email address
    subject: "New contact form submission",
    html: `<p>${message}</p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      console.log(`Email sent: ${info.response}`);
      res.sendStatus(200);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
