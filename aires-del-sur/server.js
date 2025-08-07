const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/enviar", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Nuevo mensaje de contacto",
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Mensaje enviado con éxito.");
  } catch (error) {
    console.error(error);
    res.send("Error al enviar el mensaje.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
