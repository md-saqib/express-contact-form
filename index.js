const express = require("express");
const sendgrid = require("@sendgrid/mail");
require("dotenv").config();
const app = express();
app.use(express.json());

const port = 5000;
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

var cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
  res.send("welcome to the website");
});

// create
app.post("/send-email", (req, res) => {
  formData = req.body;
  sendgrid
    .send(formData)
    .then(() => {
      // If the email was sent successfully, send a response to the client
      res.status(200).send({ message: "Email sent successfully" });
    })
    .catch((error) => {
      // If there was an error sending the email, send a response to the client
      res.status(400).send({ message: "Error sending email", error });
    });
});

app.listen(port, () => {
  console.log("server running on port", port);
});
