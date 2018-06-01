const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const fsPath = require('fs-path');
/*defind controller*/
function commonController() { }
//UU
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './images/upload/');
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        var datetimestamp = Date.now();
        var fileName = file.originalname + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
        cb(null, fileName);
    }
});
var upload = multer({
    storage: storage
}).any();
module.exports.uploadFile = function (req, res) {

    upload(req, res, function (err) {
        console.log(req.body);
        if (err) {
            return res.json({
                status: config.ERROR_STATUS, msg: err
            });

            return;
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS, msg: "Uploded Sucessfully."
            });

            return;
        }
    });

};









