const express = require('express');
const app = express();
const config = require('./config/config.js');
const auth = require('./controller/auth.js');
const public = require('./controller/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const validator = require('express-validator');
// get an instance of the router for api routes

var apiRoutes = express.Router();
var apiSecret = String(config.apiSecret);
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const logger = require('morgan')

app.use(logger("dev"));

/**
 Enable cors 
 */
var corsOptions = {
  origin: ['http://174.138.35.157:4200', 'http://localhost:4200'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// use body parser so we can get info from POST and/or URL parameters
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

//app.use(bodyParser.urlencoded({ extended: false }))

app.set('superSecret', config.secret); // secret variable
app.use(cors(corsOptions));
app.use(validator());
// app.use(expressValidator);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Credentials", false);
  next();
});

/*Define Route without Token */
app.use(express.static(__dirname + '/images'));
//app.use(express.static("http://localhost:9999" + '/images/package'));
app.use("/images", express.static(path.join(__dirname, 'images')));


app.post("/api/login", function (req, res) {
  auth.login(req, res);
})
app.post("/api/register", function (req, res) {
  auth.register(req, res);
})
app.get("/api/validatetoken", function (req, res) {
  auth.validatetoken(req, res);
})

/*Validate Token*/
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, apiSecret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error

    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

/*End of token validation*/


app.use(express.static(__dirname + '/public'));

var routes = require('./routes/routes.js')(app);
var packageRoute = require('./routes/package-route.js')(app);
var product = require('./routes/cms-route.js')(app);
var product = require('./routes/common-route.js')(app);

//apiRoutes.use(routes);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      'message': error.message

    }
  })
})
app.listen(config.server.port, function () {
  console.log('Node server listening on ' + config.server.port);
})