const config = require('../config/config.js');
const mongodb = require('../config/mongodb.js');
const bcrypt = require("bcrypt-nodejs");
const ObjectID = require('mongojs').ObjectId;
const fs = require("fs");
const multer = require('multer');
const db = mongodb.database();
const fsPath = require('fs-path');

/*defind controller*/
function hotelController() {}

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

module.exports.viewAllHotel = function (req, res) {
    /**/
    var countryid
    var status

    if (req.query.country) {
        var countryid = req.query.countrzy;
    }
    if (req.query.status) {
        status = req.query.status;
    }

    if (req.decoded && !req.decoded._id) {
        return res.json({
            status: config.ERROR_STATUS,
            msg: 'Invalid request.please connect with administrator'
        });
    } else {
        console.log(req.decoded.selectUserRole);
        if (req.decoded.selectUserRole == '5965c6c8b81a872c8ca58baa') // check if user is Super Admin
        {
            var query = {}
            if (countryid) {
                query = {
                    'country': countryid
                };
                if (status) {
                    query = {
                        'country': countryid,
                        'isactive': status
                    }
                }
            }
            if (status) {
                query = {
                    'isactive': status
                };
                if (countryid) {
                    query = {
                        'country': countryid,
                        'isactive': status
                    }
                }
            }
            db.hotel.find(query, function (err, data) {
                if (err) {
                    return res.json({
                        status: config.ERROR_STATUS,
                        msg: "Error occured"
                    });
                } else {
                    return res.json({
                        status: config.ERROR_STATUS,
                        msg: data
                    });
                }
            });

        } else {
            var query = {
                'createdBy': req.decoded._id
            }
            if (countryid) {
                query = {
                    'country': countryid,
                    'createdBy': req.decoded._id
                };
                if (status) {
                    query = {
                        'country': countryid,
                        'isactive': status,
                        'createdBy': req.decoded._id
                    }
                }
            }
            if (status) {
                query = {
                    'isactive': status,
                    'createdBy': req.decoded._id
                };
                if (countryid) {
                    query = {
                        'country': countryid,
                        'isactive': status,
                        'createdBy': req.decoded._id
                    }
                }
            }

            db.hotel.find(query, function (err, data) {
                if (err) {
                    return res.json({
                        status: config.ERROR_STATUS,
                        msg: "Error occured"
                    });
                } else {
                    return res.json({
                        status: config.ERROR_STATUS,
                        msg: data
                    });
                }
            });

        }

    }
};

/**
 * validate hotel data
 */
function isHotelValidate(req) {

    req.checkBody('hotelname', 'Hotel name cannot be blank.').notEmpty(); //server side validation
    req.checkBody('detail', 'Hotel details cannot be blank.').notEmpty(); //server side validation
    req.checkBody('geolocation', 'Hotel location cannot be blank.').notEmpty(); //server side validation
    req.checkBody('phone_numner', 'Contact no. cannot be blank.').notEmpty(); //server side validation
    req.checkBody('email', 'Not valid email entered').notEmpty();
    return req.validationErrors();
}
module.exports.saveHotel = function (req, res) {

    var query = {
        'geolocation': req.body.geolocation,
        hotelname: req.body.hotelname,
        address: req.body.address,
        createdBy: req.decoded._id,
        isactive: {
            $ne: '0'
        }
    };
    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isHotelValidate(req);
    if (isValid) {

        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    } else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.hotel.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Hotel for the given location is already exists. please try with diffrent location or name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.cdt = new Date();
                req.body.createdBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = false;

                db.hotel.save(req.body, function (err, saved) {
                    if (err || !saved) {
                        console.log(err)
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

module.exports.updateHotel = function (req, res) {

    var query = {
        'geolocation': req.body.geolocation,
        hotelname: req.body.hotelname,
        address: req.body.address,
        createdBy: req.decoded._id,
        // isactive: {
        //     $ne: '0'
        // },
        _id: {
            $ne: new ObjectID(req.body.hotelId)
        }
    };


    /**
     * check hotel data is valid or not using express validator
     */
    var isValid = isHotelValidate(req);
    if (isValid) {

        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    } else {
        /**
         * check if hotel name for the given location is already exist.
         */
        db.hotel.findOne(query, function (err, data) {
            if (data) {
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: 'Hotel for the given location is already exists. please try with diffrent location or name.'
                });
            }
            /*once validate the existing record now save hotel data */
            else {

                req.body.udt = new Date();
                req.body.updatedBy = req.decoded._id;
                req.body.status = 'Active';
                req.body.isactive = false;
                var updateQuery = {
                    _id: new ObjectID(req.body.hotelId)
                }
                db.hotel.update(
                    updateQuery,

                    {
                        $set: {
                            "hotelname": req.body.hotelname,
                            "detail": req.body.detail,
                            "address": req.body.address,
                            "geolocation": req.body.geolocation,
                            "city": req.body.city,
                            "state": req.body.state,
                            "country": req.body.country,
                            "email": req.body.email,
                            "url": req.body.url,
                            "phone_numner": req.body.phone_numner,
                            "fax": req.body.fax,
                            "mobile_contact": req.body.mobile_contact,
                            "pincode": req.body.pincode,
                            "checkIn": req.body.checkIn,
                            "checkOut": req.body.checkOut,
                            "hotelCategory": req.body.hotelCategory,
                            "services": req.body.services,
                        }
                    },

                    function (err, object) {
                        if (err) {

                            return res.json({
                                status: config.ERROR_STATUS,
                                msg: err
                            });
                        } else {

                            return res.json({
                                status: config.SUCCESS_STATUS,
                                msg: "Hotel Updated Sucessfully."
                            });
                        }
                    }
                )
            }
        });

    }



}

function isBookingvalidate(req) {
    req.checkBody('bookingFrom', 'Booking from date cannot be blank.').notEmpty(); //server side validation
    req.checkBody('bookingTill', 'Booking till cannot be blank.').notEmpty(); //server side validation
    req.checkBody('ageIfantFrom', 'Adult from age cannot be blank.').notEmpty(); //server side validation
    req.checkBody('ageInfantTo', 'Adult To age cannot be blank.').notEmpty(); //server side validation
    req.checkBody('ageChildFrom', 'Child from age cannot be blank.').notEmpty(); //server side validation
    req.checkBody('ageChildTo', 'Child To age cannot be blank.').notEmpty(); //server side validation
    req.checkBody('checkIn', 'Checkin time cannot be blank.').notEmpty(); //server side validation
    req.checkBody('checkOut', 'CheckOut time cannot be blank.').notEmpty(); //server side validation
    req.checkBody('hotelRating', 'Rating cannot be blank.').notEmpty(); //server side validation
    return req.validationErrors();
}
module.exports.saveHotelBooking = function (req, res) {

    var isValid = isBookingvalidate(req);
    if (isValid) {
        console.log(isValid);
        return res.json({
            status: config.ERROR_STATUS,
            msg: isValid
        });
    } else {
        query = {
            _id: new ObjectID(req.body.hotelId)
        }
        console.log(query);
        db.hotel.update(
            query,

            {
                $set: {
                    "bookingFrom": req.body.bookingFrom,
                    "bookingTill": req.body.bookingTill,
                    "ageIfantFrom": req.body.ageIfantFrom,
                    "ageIfantTo": req.body.ageInfantTo,
                    "ageChildFrom": req.body.ageChildFrom,
                    "ageChildTo": req.body.ageChildTo,
                    "checkIn": req.body.checkIn,
                    "checkOut": req.body.checkOut,
                    "hotelRating": req.body.hotelRating,
                }
            },
            function (err, object) {
                if (err) {
                    console.log(err)
                    return res.json({
                        status: config.ERROR_STATUS,
                        msg: err
                    });
                } else {

                    return res.json({
                        status: config.SUCCESS_STATUS,
                        msg: "Booking information saved successfully."
                    });
                }
            }
        )

    }
}
module.exports.saveAreaOfAttraction = function (req, res) {

    query = {
        _id: new ObjectID(req.body.hotelId)
    }
    console.log(query);
    db.hotel.update(
        query,

        {
            $set: {
                "areaOfAttractions": req.body.areaOfAttractions,
            }
        },

        function (err, object) {
            if (err) {
                console.log(err)
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: err
                });
            } else {

                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: "Area of attraction saved successfully."
                });
            }
        }
    )


}
module.exports.saveRate = function (req, res) {

    query = {
        _id: new ObjectID(req.body.hotel_Id)
    }

    db.hotel.update(
        query,

        {
            $set: {
                "rate": req.body.rates,
                "roomcategory": req.body.rates,
            }
        },

        function (err, object) {
            if (err) {
                console.log(err)
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: err
                });
            } else {

                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: "Rate updated successfully."
                });
            }
        }
    )


}
module.exports.saveFacilitiesServices = function (req, res) {
    query = {
        _id: new ObjectID(req.body.hotelId)
    }
    console.log(query);
    console.log(req.body.facilitiesService);
    db.hotel.update(
        query, {
            $set: {
                "facilitiesService": req.body.facilitiesService,
            }
        },
        function (err, object) {
            if (err) {
                console.log(err)
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: err
                });
            } else {

                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: "Facility & Services updated successfully."
                });
            }
        }
    )
}
module.exports.saveRoomAmenities = function (req, res) {
    query = {
        _id: new ObjectID(req.body.hotel_Id)
    }
    db.hotel.update(
        query, {
            $set: {
                "roomcategory": req.body.roomcategory,
            }
        },
        function (err, object) {
            if (err) {
                console.log(err)
                return res.json({
                    status: config.ERROR_STATUS,
                    msg: err
                });
            } else {

                return res.json({
                    status: config.SUCCESS_STATUS,
                    msg: "Room Amenities updated successfully."
                });
            }
        }
    )
}
var errorMessage;

function validateHotelSubmit(hotelId) {
    //var isValid = true;
    console.log(hotelId);
    query = {
        _id: new ObjectID(hotelId)
    }
    db.hotel.findOne(query, function (err, data) {
        if (err) {
            return res.json({
                status: config.ERROR_STATUS,
                msg: "Error occured"
            });
        } else {
            if (data) {

                if (data.areaOfAttractions) {
                    if (data.areaOfAttractions.length == 0) {
                        // return res.json({
                        //     status: config.ERROR_STATUS,
                        //     msg: "Your requested not submitted, Error in Area in Attraction."
                        // });
                        this.isValid = false;
                        errorMessage = "Your requested not submitted, Error in Area in Attraction.";
                        return isValid;
                    }
                } else {
                    var isValid = false;
                    errorMessage = "Your requested not submitted, Error in Area in Attraction.";
                    return isValid
                }
                if (data.facilitiesService) {
                    if (data.facilitiesService.length == 0) {
                        this.isValid = false;
                        errorMessage = "Your requested not submitted, Error in Facility & Services.";
                        // return res.json({
                        //     status: config.ERROR_STATUS,
                        //     msg: "Your requested not submitted, Error in Facility & Services."
                        // });
                        return isValid;
                    }
                } else {
                    var isValid = false;
                    errorMessage = "Your requested not submitted, Error in Facility & Services.";
                    return isValid;
                }
            } else {
                var isValid = false;
                errorMessage = "Error In Hotel submission please check your details."
                return isValid;
            }
        }

    })

}
module.exports.saveGalary = function (req, res) {
    var Error;
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './images/hotel/');
        },
        filename: function (req, file, cb) {

            //var a = validateHotelSubmit(req.body.hotelId);
            //console.log(a);
            if (true) {
                console.log("isValid");
                console.log(validateHotelSubmit(req.body.hotelId));
                // var datetimestamp = Date.now();
                console.log(file.fieldname);
                cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);

            } else {
                // return res.json({
                //     status: config.ERROR_STATUS,
                //     msg: "Error occured"
                // });
                upload(new Error("Error"));
            }
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function (err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null
        });
    });


}
module.exports.saveGalaryImage = function (req, res) {
    let savedImage = [];
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './images/hotel/');
        },
        filename: function (req, file, cb) {
            let datetimestamp = Date.now();
            let fileName;
            if (file.originalname == "blob") {
                fileName = file.fieldname + '-' + datetimestamp + '.jpg'
            } else {
                fileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
            }
            savedImage.push({
                'hotel_id': file.fieldname,
                'imageSource': '/images/hotel/' + fileName
            });
            cb(null, fileName);
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function (err) {
        if (err) {
            res.json({
                status: config.ERROR_STATUS,
                msg: err
            });
            return;
        } else {

            query = {
                _id: new ObjectID(req.body.hotelId)
            }
            db.hotel.update(
                query, {
                    $set: {
                        "galary": savedImage,
                    }
                },
                function (err, object) {
                    if (err) {
                        console.log(err)
                        return res.json({
                            status: config.ERROR_STATUS,
                            msg: err
                        });
                    } else {
                        return res.json({
                            status: config.SUCCESS_STATUS,
                            msg: "Hotel gallary added sucessfully."
                        });
                    }
                }
            )
        }
    });
}

module.exports.viewHotelById = function (req, res) {
    /**/
    var countryid
    var status
    hotelId = req.query.hotelId;
    console.log(req.query);
    query = {
        "_id": new ObjectID(hotelId)
    }
    console.log(query);
    db.hotel.findOne(query, function (err, data) {

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
    })
};