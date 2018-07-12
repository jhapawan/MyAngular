const express = require('express');
const app = express();
const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const bodyParser = require('body-parser');
/*defind controller*/
function blogController() {}
app.use(bodyParser.json());
module.exports.addBlog = function (req, res) {
    var isValidate = isPostValidate(req);
    if (isValidate) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValidate
        });
    } else {
        var query = {
            'title': req.body.title
        };
        db.blog.findOne(query, function (err, data) {
            if (err) {
                //printLog(err);
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: err
                });
            }
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'It seems we have already a blog with same title so please change the title and save.'
                });
            } else {
                req.body.user = new ObjectID(req.decoded._id);
                req.body.cdt = new Date();
                req.body.isActive = 0;

                db.blog.save(req.body, function (err, dataSaved) {
                    if (err || !dataSaved) {
                        return res.json({
                            status: config.ERROR_STATUS,
                            msg: err
                        });
                    } else if (dataSaved) {
                        return res.json({
                            status: config.SUCCESS_STATUS,
                            msg: dataSaved._id
                        });
                    }
                })
            }
        })

    }
};

function isPostValidate(req) {
    req.checkBody('title', 'Blog Post Title cannot be blank.').notEmpty();
    req.checkBody('tag', 'Please slect atleast one Tag.').notEmpty();
    req.checkBody('description', 'Description cannot be valid.').notEmpty();
    return req.validationErrors();
}

/*Get All Blog to show on Public pages */

module.exports.getAllPublicBlog = function (req, res) {

    var getfields = {
        "name": 1,
        "image": 1,
        "city": 1,
        "state": 1,
        "country": 1,
        "phone": 1,
        "about": 1,
        "profession": 1,
        "exeperience": 1,
        "education": 1,
        "skill": 1,
        "galary": 1,
        "isactive": 1,
        "facebookImage": 1,
        "googleImage": 1,
        "facebookId": 1,
        "googleId": 1


    };

    db.blog.aggregate([{
        $lookup: {
            from: 'user',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
        }
    }]).toArray(function (err, result) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS
            });
        } else {
            /*Shorting array */
            sortBy(result, {
                prop: "cdt",
                desc: true,
                parser: function (item) {
                    //ignore case sensitive
                    return item;
                }
            });
            return res.json({
                status: config.SUCCESS_STATUS,
                data: result
            });

        }

    });

};
var sortBy = (function () {
    //cached privated objects
    var _toString = Object.prototype.toString,
        //the default parser function
        _parser = function (x) {
            return x;
        },
        //gets the item to be sorted
        _getItem = function (x) {
            return this.parser((x !== null && typeof x === "object" && x[this.prop]) || x);
        };
    return function (array, o) {
        if (!(array instanceof Array) || !array.length)
            return [];
        if (_toString.call(o) !== "[object Object]")
            o = {};
        if (typeof o.parser !== "function")
            o.parser = _parser;
        o.desc = !!o.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = _getItem.call(o, a);
            b = _getItem.call(o, b);
            return o.desc * (a < b ? -1 : +(a > b));
        });
    };

}());