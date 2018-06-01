const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const fsPath = require('fs-path');

/*defind controller*/
function packageController() { }
module.exports.getPackage = function (req, res) {
    /**/
    var countryid
    var status
    var query = { 'createdBy': req.decoded._id }

    if (req.query.status) {
        status = req.query.status;
    }

    if (req.decoded && !req.decoded._id) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: 'Invalid request.please connect with administrator'
        });
    }
    else {
        db.package.find(query, function (err, data) {
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
        });
    }

}
module.exports.getPackagebyid = function (req, res) {
    /**/
    var countryid
    var id


    if (req.query.id) {
        id = req.query.id;
    }
    var query = { '_id': new ObjectID(id) }

    if (req.decoded && !req.decoded._id) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: 'Invalid request.please connect with administrator'
        });
    }
    else {
        db.package.findOne(query, function (err, data) {
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
        });
    }

}

/**
 * validate hotel data
 */
function isValidAboutPackage(req) {

    req.checkBody('packageName', 'Package name cannot be blank.').notEmpty(); //server side validation
    req.checkBody('packageType', 'Package Type not valid.').notEmpty(); //server side validation
    req.checkBody('descriptions', 'Description cannot be blank.').notEmpty(); //server side validation
    req.checkBody('packageStart', 'Package start date is not valid.').notEmpty(); //server side validation
    req.checkBody('packageEnd', 'Package end date is not valid.').notEmpty();
    req.checkBody('noOfDays', '# days  is not valid.').notEmpty();
    req.checkBody('noOfNight', '# Night end date is not valid.').notEmpty();
    req.checkBody('curency', 'Currency not valid.').notEmpty();
    req.checkBody('pricePerPerson', 'Price Per Person is not valid.').notEmpty();
    req.checkBody('pricePerChild', 'Price Per Child is not valid.').notEmpty();
    req.checkBody('noOfPeopleAllowed', '# of person is not  valid.').notEmpty();

    return req.validationErrors();
}
module.exports.savePackage = function (req, res) {

    var query = {
        packageName: req.body.packageName,
        createdBy: req.decoded._id,
        isactive: { $ne: '0' }
    };
    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isValidAboutPackage(req);
    if (isValid) {

        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.package.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Package for the given name is already exist in database. please try with diffrent name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = false;

                db.package.save(req.body, function (err, saved) {
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
module.exports.updatePackage = function (req, res) {
    console.log(req.body);
    var query = {
        packageName: req.body.packageName,
        createdBy: req.decoded._id,
        isactive: { $ne: '0' },
        _id: { $ne: new ObjectID(req.body.packageId) }

    };

    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isValidAboutPackage(req);
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
        db.package.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Package for the given name is already exist in database. please try with diffrent name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.udt = new Date();
                req.body.updatedBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = false;
                var updateQuery = {
                    _id: new ObjectID(req.body.packageId)
                }
                console.log(updateQuery);
                db.package.update(
                    updateQuery,

                    {
                        $set: {
                            "packageName": req.body.packageName,
                            "packageType": req.body.packageType,
                            "descriptions": req.body.descriptions,
                            "packageStart": req.body.packageStart,
                            "packageEnd": req.body.packageEnd,
                            "noOfDays": req.body.noOfDays,
                            "noOfNight": req.body.noOfNight,
                            "curency": req.body.curency,
                            "pricePerPerson": req.body.pricePerPerson,
                            "pricePerChild": req.body.pricePerChild,
                            "noOfPeopleAllowed": req.body.noOfPeopleAllowed
                        }
                    },
                    function (err, saved) {
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
function isValidPackageDeails(req) {
    req.checkBody('pickUpPoint', 'Pickup Point cannot be blank.').notEmpty(); //server side validation   
    req.checkBody('contactPerson', 'Contact Person cannot be blank.').notEmpty(); //server side validation
    req.checkBody('contactPersonMobile', 'Contact person mobile is not valid.').notEmpty(); //server side validation
    req.checkBody('emergencyContactPerson', 'Emergency contact person not valid.').notEmpty();
    req.checkBody('emergencyContactNo', 'Emergency contact # is not valid.').notEmpty();
    return req.validationErrors();
}
module.exports.updatePackageDetails = function (req, res) {
    console.log(req.body);
    var isValid = isValidPackageDeails(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        query = {
            _id: new ObjectID(req.body.packageId)
        }
        console.log(query);
        db.package.update(
            query,

            {
                $set: {
                    "pickUpPoint": req.body.pickUpPoint,
                    "pickUpTime": req.body.pickUpTime,
                    "contactPerson": req.body.contactPerson,
                    "contactPersonMobile": req.body.contactPersonMobile,
                    "emergencyContactPerson": req.body.emergencyContactPerson,
                    "emergencyContactNo": req.body.emergencyContactNo,
                    "contactPersonEmail": req.body.contactPersonEmail
                }
            },
            function (err, object) {
                if (err) {
                    console.log(err)
                    return res.json({
                        status: config.ERROR_STATUS, msg: err
                    });
                }
                else {

                    return res.json({
                        status: config.SUCCESS_STATUS, msg: "Package details saved successfully."
                    });
                }
            }
        )

    }

}

module.exports.updatePackageItinery = function (req, res) {

    query = {
        _id: new ObjectID(req.body.packageId)
    }
    console.log(query);
    db.package.update(
        query,

        {
            $set: {
                "packageItinery": req.body.packageItinery

            }
        },
        function (err, object) {
            if (err) {
                console.log(err)
                return res.json({
                    status: config.ERROR_STATUS, msg: err
                });
            }
            else {

                return res.json({
                    status: config.SUCCESS_STATUS, msg: "Package details saved successfully."
                });
            }
        }
    )

}
// module.exports.updatePackageItinery = function (req, res) {

//     query = {
//         _id: new ObjectID(req.body.packageId)
//     }
//     console.log(query);
//     db.package.update(
//         query,

//         {
//             $set: {
//                 "packageItinery": req.body.packageItinery

//             }
//         },
//         function (err, object) {
//             if (err) {
//                 console.log(err)
//                 return res.json({
//                     status: config.ERROR_STATUS, msg: err
//                 });
//             }
//             else {

//                 return res.json({
//                     status: config.SUCCESS_STATUS, msg: "Package details saved successfully."
//                 });
//             }
//         }
//     )

// }

function isValidPackageNotes(req) {
    console.log(req.body.hotelName);
    req.checkBody('includedNotes', 'Include notes cannot be blank.').notEmpty(); //server side validation
    req.checkBody('excludedNotes', 'Exclude notes cannot be blank.').notEmpty(); //server side validation    
    return req.validationErrors();
}
module.exports.updatePackageNotes = function (req, res) {

    var isValid = isValidPackageNotes(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    }
    else {
        query = {
            _id: new ObjectID(req.body.packageId)
        }
        console.log(query);
        db.package.update(
            query,

            {
                $set: {
                    "includedNotes": req.body.includedNotes,
                    "excludedNotes": req.body.excludedNotes
                }
            },
            function (err, object) {
                if (err) {
                    console.log(err)
                    return res.json({
                        status: config.ERROR_STATUS, msg: err
                    });
                }
                else {

                    return res.json({
                        status: config.SUCCESS_STATUS, msg: "Package notes saved successfully."
                    });
                }
            }
        )
    }

}
module.exports.updatePackageImages = function (req, res) {
    var packageId;
    var images = [];
    var updatedImage =[];
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './images/package/');
        },
        filename: function (req, file, cb) {
            console.log(req.body);
            var datetimestamp = Date.now();
            packageId = req.body.packageId;                        
            console.log(req.body.updateImage);
            if(req.body.updateImage){
                req.body.updateImage.forEach(function(element){
                   updatedImage.push(element);
                })    
            }
            var fileName = req.body.packageId + '-' + datetimestamp +'.'+ file.originalname.split('.')[file.originalname.split('.').length - 1]
            images.push(fileName);
            cb(null, fileName);
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function (err) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS, msg: err
            });

            return;
        }
        else {
            query = {
                _id: new ObjectID(packageId)
            }
            console.log(query);
            updatedImage.forEach(function(element) {
                if(element){
                images.push(element);
            }
                
            }, this);
            
            
            db.package.update(
                query,

                {
                    $set: {
                        "images": images
                    }
                },
                function (err, object) {
                    if (err) {
                        console.log(err)
                        return res.json({
                            status: config.ERROR_STATUS, msg: err
                        });
                    }
                    else {

                        return res.json({
                            status: config.SUCCESS_STATUS, msg: "Package galary updated successfully."
                        });
                    }
                }
            )

        }
    });

}



