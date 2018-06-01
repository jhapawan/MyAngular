const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const db = mongodb.database();

function countriesController() {};

module.exports.getCountry = function (req, res) {
    var query = {};
    var selectedFiled = {
        "CountryName": (1)
    }
    db.contries.find(query, selectedFiled, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                data: []
            });
        }
        if (data) {
            return res.json({
                status: config.SUCCESS_STATUS,
                data: data
            });
        }
    });
};

module.exports.getState = function (req, res) {
    var country = req.query.countryname;
    var query = {
        CountryName: country
    };
    var selectedFiled = {
        "States": (1)
    }
    db.contries.find(query,selectedFiled, function (err, data) {
        if (err) {
            console.log("error");
            return res.json({
                status: config.ERROR_STATUS,
                data: []
            });
        }
        if (data) {
            return res.json({
                status: config.SUCCESS_STATUS,
                data: data
            });
        }
    });
};