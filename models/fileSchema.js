const mongoose = require("mongoose");
const noadmailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    let transporter = noadmailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // send mail
    let info = transporter.sendMail({
      from: "Pratham Don",
      to: doc.email,
      sunject: "Sample Mail",
      html: `<h2>Hello Bhai</h2> <p>File Uploaded</p>`,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
});
const File = mongoose.model("File", fileSchema);
module.exports = File;
