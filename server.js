const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes/routes');

const app = express();
//https://mongoosejs.com/docs/populate.html

//DB setting
var mongoDB =
  "mongodb://admin:admin123@ds153239.mlab.com:53239/cs_200_testing_service";
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // Get Mongoose to use the global promise library
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Middleware setting
app.use(express.json()); // application / json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes setting
routes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
module.exports = app;