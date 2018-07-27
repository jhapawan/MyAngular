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
        db.user.findOne(query, function (err, data, next) {
            if (err) console.log("Error" + err);
            //check if user exists
            if (!data) {
                console.log("asd");
                res.json({
                    status: config.ERROR_STATUS,
                    msg: "The email address or phone number that you've entered doesn't match any account. Sign up for an account."

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
                        firstName: data.firstName,
                        lastName: data.lastName,
                        name: data.firstName + " " + data.lastName,
                        id: data._id,
                        token: token,
                        cDate: data.cdt,
                        email: data.email,
                        birthDate: data.birthDate,
                        profilePic: data.filename,
                        skill: data.skill

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

function isUserValidate(req) {
    req.checkBody('firstName', 'First name cannot be blank.').notEmpty(); //server side validation
    req.checkBody('email', 'Invalid Email').isEmail();
    //req.checkBody('pwd', '6 to 20 characters required').len(6, 20);
    req.checkBody('lastName', 'Last Name cannot be blank.').notEmpty();
    req.checkBody('password', 'Password cannot be blank.').notEmpty();
    req.checkBody('birthDate', 'Date of birth is not valid date.').isDate();
    //req.checkBody('selectStatus', 'must enter').notEmpty();
    return req.validationErrors();
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
        var isValidate = isUserValidate(req);
        if (isValidate) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: isValidate
            });
        } else {
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
                        req.body.cdt = new Date();
                        req.body.isActive = false;
                        db.user.save(req.body, function (err, data) {
                            if (err || !data) {
                                return res.json({
                                    status: config.ERROR_STATUS,
                                    msg: err
                                });
                            } else if (data) {
                                mailer.SendEMail(req.body.email, "User verification - Contribute Skills !",
                                    "Welcome " + req.body.firstName + "</br> Please click the below link to verify your User login!", "");
                                return res.json({
                                    status: config.SUCCESS_STATUS,
                                    msg: "Thank you " + req.body.firstName + " You have been successfully registered. We have sent you an email . please verify!"
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
        }
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
        "provider": {
            $in: ['google', 'facebook']
        }
    };
    data.cdt = new Date();
    data.status = 'Active';
    data.isactive = true;


    db.user.findOne(queryUserExist, function (err, existingData) {

        if (err) {
            console.log("Error Ocured");
        } else if (existingData) {
            // console.log(existingData);
            if (existingData.provider.filter(word => word == data.provider).length == 0) {

                let provider = existingData.provider;
                provider.push(data.provider);
                var queryUpdate = {
                    "email": data.email
                };
                if (data.provider == 'google') {
                    db.user.update(queryUpdate, {
                        $set: {
                            "googleId": data.googleId,
                            "googleImage": data.googleImage,
                            "provider": provider
                        }
                    }, function (err, object) {})

                } else {
                    db.user.update(queryUpdate, {
                        $set: {
                            "facebookId": data.facebookId,
                            "facebookImage": data.facebookImage,
                            "provider": provider
                        }
                    }, function (err, object) {})
                }

            }
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
                cDate: existingData.cdt,
                lastName: existingData.lastName,
                phone: existingData.phone,
                birthDate: existingData.birthDate,
                city: existingData.city,
                country: existingData.country,
                state: existingData.state,
                pinCode: existingData.pinCode,
                about: existingData.about,
                profession: existingData.profession,
                exeperience: existingData.exeperience,
                education: existingData.education,
                skill: existingData.skill,
                galary: existingData.galary,
                googleId: existingData.googleId,
                googleImage: existingData.googleImage,
                facebookId: existingData.facebookId,
                facebookImage: existingData.facebookImage,

            });
        } else {
            data.provider = [data.provider];
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
                        cDate: dataSaved.cdt,
                        lastName: dataSaved.lastName,
                        phone: dataSaved.phone,
                        birthDate: dataSaved.birthDate,
                        city: dataSaved.city,
                        country: dataSaved.country,
                        state: dataSaved.state,
                        pinCode: dataSaved.pinCode,
                        about: dataSaved.about,
                        profession: dataSaved.profession,
                        exeperience: dataSaved.exeperience,
                        education: dataSaved.education,
                        skill: dataSaved.skill,
                        galary: dataSaved.galary,
                        googleId: dataSaved.googleId,
                        googleImage: dataSaved.googleImage,
                        facebookId: dataSaved.facebookId,
                        facebookImage: dataSaved.facebookImage,
                    });
                }
            })
        }

    })
}