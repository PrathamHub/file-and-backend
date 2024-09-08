// require in dotenv file
// CLOUD_NAME=
// API_KEY=
// API_SECRET=
// PORT=
// MONGO_URL=
// MAIL_HOST=
// MAIL_USER=
// MAIL_PASS=

const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const db = require("./config.js/dbConection");
db.dbConnection();

const cloudniary = require("./config.js/cloudnary");
cloudniary.cnConnection();

const Upload = require("./routers/fileUpload");
app.use("/api/v1/upload", Upload);

app.listen(process.env.PORT, () => {
  console.log("listening");
});
