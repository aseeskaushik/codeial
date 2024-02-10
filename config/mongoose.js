const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

mongoose.connect(
  `mongodb+srv://proakkaushik:${process.env.DB}@cluster0.hedjjdw.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database:: MongoDB");
});

module.exports = db;
