const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const passport = require('passport');
const app = express();
const saml = require('passport-saml');
const fs = require('fs');
//https://mongoosejs.com/docs/populate.html

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

app.use(passport.initialize());
app.use(passport.session());


app.get('/api/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.post('/api/login/callback',
   passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/login/fail', 
  function(req, res) {
    res.status(401).send('Login failed');
  }
);



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
