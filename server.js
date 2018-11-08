const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const login = require('./routes/login');
const passport = require('passport');
const saml = require('passport-saml');
const fs = require('fs');

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

//Login setting
var samlStrategy = new saml.Strategy({
  // URL that goes from the Identity Provider -> Service Provider
  callbackUrl: '/api/login/callback',
  // URL that goes from the Service Provider -> Identity Provider
  entryPoint: 'https://auth.miniorange.com/moas/idp/samlsso',
  // Usually specified as `/shibboleth` from site root
  issuer: "passport-saml",
  // Service Provider Certificate
  privateCert: fs.readFileSync(__dirname + '/cert/private_key.pem', 'utf8'),
  // Identity Provider's public key
  cert: fs.readFileSync(__dirname + '/cert/idp_cert.pem', 'utf8')
}, function(profile, done) {
  return done(null, profile);
});
passport.use(samlStrategy);

//Middleware setting
app.use(express.json()); // application / json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


//Routes setting
routes(app); //createTest
login(app, passport); //login

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
module.exports = app;
