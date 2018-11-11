const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes/routes');

const app = express();
//https://mongoosejs.com/docs/populate.html


mongoose.Promise = global.Promise; // Get Mongoose to use the global promise

//dev version of DB
if (process.env.NODE_ENV !== 'test') {
  //DB setting
  var mongoDB =
  "mongodb://admin:admin123@ds153239.mlab.com:53239/cs_200_testing_service";
  mongoose.connect(mongoDB,{ useNewUrlParser: true });
}else{
  //set test db here script for running test:
  //"test": "NODE_ENV=test nodemon --exec 'mocha --recursive -R min'"
  var mongoDB = "mongodb://<admin123>:<admin123>@ds231229.mlab.com:31229/test_database_cs_200";
  mongoose.connect(mongoDB, { useNewUrlParser: true });
}

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