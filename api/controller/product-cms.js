const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const fsPath = require('fs-path');

/*defind controller*/
function productController() {}

/* */
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

module.exports.viewAllProduct = function (req, res) {
    /**/
    var countryid
    var status

    // if (req.query.country) {
    //     var countryid = req.query.countrzy;
    // }
    // if (req.query.status) {
    //     status = req.query.status;
    // }

    if (req.decoded && !req.decoded._id) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: 'Invalid request.please connect with administrator'
        });
    } else {
        var query = {
            'createdBy': req.decoded._id
        }
        db.product.find(query, function (err, data) {
            if (err) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: "Error occured"
                });
            } else {
                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: data
                });
            }
        });



    }
};
module.exports.viewProductById = function (req, res) {

    if (req.decoded && !req.decoded._id) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: 'Invalid request.please connect with administrator'
        });
    } else {

        var query = {
            '_id': new ObjectID(req.query.id)
        }
        db.product.findOne(query, function (err, data) {
            if (err) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: "Error occured"
                });
            } else {
                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: data
                });
            }
        });



    }
};

/**
 * validate hotel data
 */
function isProuctValidate(req) {
    req.checkBody('productName', 'Product name cannot be blank.').notEmpty(); //server side validation    
    return req.validationErrors();
}
module.exports.saveProduct = function (req, res) {
    var query = {
        'productName': req.body.productName
    };
    /**
     * check product data is valid or not using express validator
     */
    var isValid = isProuctValidate(req);
    if (isValid) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    } else {
        /**
         * check if product name for the given  already exist.
         */
        db.product.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Product already exist for the given name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {
                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = true;
                db.product.save(req.body, function (err, saved) {
                    if (err || !saved) {
                        return res.json({
                            status: config.ERROR_STATUS,
                            msg: err
                        });
                    } else if (saved) {
                        return res.json({
                            status: config.SUCCESS_STATUS,
                            msg: saved._id
                        });
                    }
                });
            }
        });

    }



}
module.exports.updateProduct = function (req, res) {
    var query = {
        'productName': req.body.productName,
        _id: {
            $ne: new ObjectID(req.body.Id)
        }
    };
    /**
     * check product data is valid or not using express validator
     */
    var isValid = isProuctValidate(req);
    if (isValid) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    } else {
        /**
         * check if product name for the given  already exist.
         */
        db.product.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Product already exist for the given name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.updatedBy = req.decoded._id;
                req.body.udt = new Date();
                var updateQuery = {
                    _id: new ObjectID(req.body.Id)
                }
                db.product.update(updateQuery, {
                    $set: {
                        "productName": req.body.productName,
                        "productCategory": req.body.productCategory,
                        "productDescription": req.body.productDescription,
                        "manufactureCompany": req.body.manufactureCompany,
                        "updatedBy": req.body.updatedBy,
                        "udt": req.body.udt
                    }
                }, function (err, saved) {
                    if (err || !saved) {
                        return res.json({
                            status: config.ERROR_STATUS,
                            msg: err
                        });
                    } else if (saved) {
                        return res.json({
                            status: config.SUCCESS_STATUS,
                            msg: "Product Updated Successfully."
                        });
                    }
                });
            }
        });

    }



}