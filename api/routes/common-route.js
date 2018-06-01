/*define controller*/
countires = require('../controller/countries.js');


var express = require('express');
bodyParser = require('body-parser');
multer = require('multer');
app = express();
var upload = multer()

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({
    extended: true
})

module.exports = function (app, controller) {

    /*User Api*/
    app.get('/api/common/getcounties', countires.getCountry);
    app.get('/api/common/getstates', countires.getState);
    // app.get('/api/user/finduserrole', user.findUserRole);


}