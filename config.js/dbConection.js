const mongoose = require("mongoose");
require("dotenv").config();
exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
      console.log(error);
    });
};
