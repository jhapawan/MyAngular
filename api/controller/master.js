const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const fsPath = require('fs-path');

/*defind controller*/
function masterController() { }
function ispackageType(req) {
    console.log(req.body.hotelName);
    req.checkBody('packageType', 'Transport Type cannot be blank.').notEmpty(); //server side validation
    return req.validationErrors();
}
module.exports.savePackageType = function (req, res) {
    console.log(req.body);
    var query = {
        'packageType': req.body.packageType
    };
    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = ispackageType(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.packagetype.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Transport Type already in database, please try with some diffrent name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = true;

                db.packagetype.save(req.body, function (err, saved) {
                    if (err || !saved) {
                        console.log(err)
                        return res.json({
                            status: config.ERROR_STATUS, msg: err
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
module.exports.getPackageType = function (req, res) {
    var query = {}
    db.packagetype.find(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: data
            });
        }
    })
}

function isTransportType(req) {
    console.log(req.body.hotelName);
    req.checkBody('transporttype', 'Package Type cannot be blank.').notEmpty(); //server side validation
    return req.validationErrors();
}
module.exports.saveTransportType = function (req, res) {
    console.log(req.body);
    var query = {
        'transporttype': req.body.packageType
    };
    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isTransportType(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.transporttype.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Package Type already in database, please try with some diffrent name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = true;

                db.transporttype.save(req.body, function (err, saved) {
                    if (err || !saved) {
                        console.log(err)
                        return res.json({
                            status: config.ERROR_STATUS, msg: err
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
module.exports.getTransportType = function (req, res) {
    var query = {}
    db.transporttype.find(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: data
            });
        }
    })
}
module.exports.saveMenu = function (req, res) {

    req.body.cdt = new Date();
    req.body.createdBy = req.decoded._id;
    req.body.status = 'Active';
    req.body.isactive = true;

    db.menu.save(req.body, function (err, saved) {
        if (err || !saved) {
            console.log(err)
            return res.json({
                status: config.ERROR_STATUS, msg: err
            });
        } else if (saved) {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: saved._id
            });
        }
    });
}
module.exports.getAllMenu = function (req, res) {
    var query = {}
    db.menu.find(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: data
            });
        }
    })
}

module.exports.saveRole = function (req, res) {
    console.log(req.body);
    var query = {
        'role': req.body.role
    };
    req.body.cdt = new Date();
    req.body.createdBy = req.decoded._id;
    req.body.status = 'Active';
    req.body.isactive = true;
    db.role.findOne(query, function (err, data) {
        if (data) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: 'Role with the same name is already exist, please try with some other name.'
            });
        }
        else {
            db.role.save(req.body, function (err, saved) {
                if (err || !saved) {
                    console.log(err)
                    return res.json({
                        status: config.ERROR_STATUS, msg: err
                    });
                } else if (saved) {
                    return res.json({
                        status: config.SUCCESS_STATUS,
                        msg: saved._id
                    });
                }
            });
        }
    })
}
module.exports.getAllRole = function (req, res) {
    var query = {}
    db.role.find(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: data
            });
        }
    })
}

/**
 * For Room category
 */
function isValidRoomCategory(req) {
    // console.log(req.body.roomCategory);
    req.checkBody('roomcategory', 'Room Category cannot be blank.').notEmpty(); //server side validation
    return req.validationErrors();
}
module.exports.saveRoomCategory = function (req, res) {
    console.log(req.body);
    var query = {
        'roomCategory': req.body.roomcategory
    };
    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isValidRoomCategory(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.roomcategory.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Transport Type already in database, please try with some diffrent name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = true;

                db.roomCategory.save(req.body, function (err, saved) {
                    if (err || !saved) {
                        console.log(err)
                        return res.json({
                            status: config.ERROR_STATUS, msg: err
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
module.exports.getRoomCategory = function (req, res) {
    var query = {}
    db.roomCategory.find(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        }
        else {
            return res.json({
                status: config.SUCCESS_STATUS,
                msg: data
            });
        }
    })
}

