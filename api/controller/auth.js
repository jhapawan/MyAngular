const config = require('../config/config.js');
const mailer = require('./mailer.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const ErrorLog = require('../common/error.js');
const db = mongodb.database();;
var jwt = require('jsonwebtoken');
var apiSecret = String(config.apiSecret);

function AuthController() {}

module.exports.login = function (req, res) {
    try {

        var email = req.body.email;
        var pwd = req.body.password;
        var query = {
            "email": email
            // "$or": [{
            //     "selectStatus": "Enable"
            // }, {
            //     "isactive": "Enable"
            // }]
        };

        //find user and generate Token for further validation
        db.user.findOne(query, {
            "email": 1,
            "email": 1,
            "selectUserRole": 1,
            "password": 1,
            "cperson": 1,
            "role": 1,
            "permission": 1,
            "cdt": 1,
            "filename": 1

        }, function (err, data) {

            if (err) console.log("Error" + err);
            //check if user exists
            if (!data) {
                res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                if (bcrypt.compareSync(pwd, data['password'])) {
                    //generate Token
                    var token = jwt.sign(data, apiSecret, {
                        expiresIn: 10080 // expires in 24 hours
                    });
                    return res.json({
                        status: config.SUCCESS_STATUS,
                        user: data.email,
                        name: data.fname,
                        id: data._id,
                        permission: data.permission,
                        token: token,
                        role: data.role,
                        cDate: data.cdt,
                        profilePic: data.filename
                    });
                } else {
                    res.json({
                        status: config.ERROR_STATUS,
                        msg: 'Incorrect password.'
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports.register = function (req, res, next) {
    if (req.body.provider) {
        return doSocialRegistration(req.body, res);
    }
    query = {
        "email": req.body.email,
        "provider": {
            $nin: ['google', 'facebook']
        }
    };
    try {
        db.user.findOne(query, function (err, data, next) {
            if (err) {
                res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Error occured please contact to administrator.'
                });
            } else if (data) {
                res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Login Name ' + req.body.email + ' already in our database.'
                });
            } else {
                try {
                    console.log(req.body.password);
                    let password = getEncryptedPwd(req.body.password);
                    req.body.password = password;
                    db.user.save(req.body, function (err, data) {
                        if (err || !data) {
                            return res.json({
                                status: config.ERROR_STATUS,
                                msg: err
                            });
                        } else if (data) {
                            mailer.SendEMail(req.body.email, "User Registration | pawanjha.com", "Thank you, you have been now register with our site , please use below link to activate your account.", "");
                            return res.json({
                                status: config.SUCCESS_STATUS,
                                msg: "Registration sucessfully, Email sent to your email id " + req.body.email + ', please verify'
                            });
                        }
                    })
                } catch (error) {
                    res.json({
                        status: config.ERROR_STATUS,
                        msg: 'Error occured please contact to administrator.'
                    });
                }
            }
        })
    } catch (error) {
        res.json({
            status: config.ERROR_STATUS,
            msg: 'Error occured please contact to administrator.'
        });
    }

    function getEncryptedPwd(pwd) {
        return bcrypt.hashSync(pwd);
    }
}

module.exports.validatetoken = function (req, res) {
    try {
        let decoded = jwt.verify(req.query.token, apiSecret);

        if (decoded) {

            res.json({
                status: config.SUCCESS_STATUS,
                msg: true
            });
        }
    } catch (err) {
        // err
        res.json({
            status: config.Error_STATUS,
            msg: false
        });
    }
}
doSocialRegistration = function (data, res) {
    var queryUserExist = {
        "email": data.email,
        "provider": data.provider
    };
    data.cdt = new Date();
    data.status = 'Active';
    data.isactive = true;
    
    db.user.findOne(queryUserExist, function (err, existingData) {
        if (err) {
            console.log("Error Ocured");
        } else if (existingData) {
            // console.log(existingData);
            var token = jwt.sign(existingData, apiSecret, {
                expiresIn: 10080 // expires in 24 hours
            });
            return res.json({
                status: config.SUCCESS_STATUS,
                user: existingData.email,
                name: existingData.fname,
                id: existingData._id,
                permission: existingData.permission,
                token: token,
                role: existingData.role,
                cDate: existingData.cdt,
                profilePic: existingData.filename,
                email: existingData.email,
                name: existingData.name,
                provider: existingData.provider,
                image: existingData.image,
                cDate: existingData.cdt,
            });
        } else {
            db.user.save(data, function (errSave, dataSaved) {
                if (errSave) {
                    console.log("Error Ocured while going to save the user")
                } else {
                    var token = jwt.sign(dataSaved, apiSecret, {
                        expiresIn: 10080 // expires in 24 hours
                    });
                    return res.json({
                        status: config.SUCCESS_STATUS,
                        user: dataSaved.email,
                        name: dataSaved.fname,
                        id: dataSaved._id,
                        permission: dataSaved.permission,
                        token: token,
                        role: dataSaved.role,
                        cDate: dataSaved.cdt,
                        profilePic: dataSaved.filename,
                        email: dataSaved.email,
                        name: dataSaved.name,
                        provider: dataSaved.provider,
                        image: dataSaved.image,
                        cDate: dataSaved.cdt
                    });
                }
            })
        }
    })
}