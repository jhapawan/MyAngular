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
function userController() {}
app.use(bodyParser.json());
module.exports.updatePassword = function (req, res) {

	res.json({
		status: 'Update Password',
		code: '200'
	});
};

module.exports.isUserExist = function (req, res) {
	try {
		var query = {};
		var id = req.query.uname;

		if (req.query.uname) {
			query = {
				'uname': req.query.uname
			};
		}
		// } else if (req.body.email) {
		// 	query = {
		// 		'email': req.body.email
		// 	};
		// }

		db.user.findOne(query, function (err, data) {
			if (err) {
				printLog(err);
			}
			if (data) {

				return res.json({
					status: config.ERROR_STATUS,
					msg: 'Username already exists.please try with diffrent UserName.'
				});
			} else {
				return res.json({
					status: config.SUCCESS_STATUS
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports.creatUserGroup = function (req, res) {
	try {

		if (!req.body.groupnm) {
			return res.json({
				status: config.ERROR_STATUS,
				msg: 'no record found'
			});
		}
		req.checkBody('groupnm', 'invalid').notEmpty();
		req.checkBody('permission', 'invalid').notEmpty();
		let isValidate = req.validationErrors();
		if (isValidate)
			return res.json({
				status: config.ERROR_STATUS,
				err: isValidate
			});
		var query = {
				'groupnm': req.body.groupnm
			},
			update = req.body;
		update['updtby'] = req.body.uid;
		update['sts'] = '1'; //by default group enable
		update['cdt'] = new Date();
		update['isactive'] = 'Enable';
		db.usergroup.findOne(query, function (err, data) {
			if (err) {
				printLog(err);
			}
			if (data) {
				return res.json({
					status: config.ERROR_STATUS,
					msg: 'already exist'
				});
			} else {
				db.usergroup.save(update, function (err, saved) {
					if (err || !saved) {
						return res.json({
							status: config.ERROR_STATUS,
							message: err
						});
					} else if (saved) {
						return res.json({
							status: config.SUCCESS_STATUS,
							message: "Group ! Saved successfully."
						});
					} else {
						return res.json({
							status: config.ERROR_STATUS,
							message: "Error ! While saving Group."
						});
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports.findAllGroup = function (req, res) {
	try {
		db.usergroup.find({}, {}, function (err, result) {
			if (err) {
				console.log('err', err)
				return res.json({
					status: config.ERROR_STATUS
				});
			} else if (!result) {

				return res.json({
					status: config.SUCCESS_STATUS,
					msg: 'No users group found'
				});
			} else {
				if (result.length) {
					let finalArr = [],
						myRes = [];
					result.forEach(function (y) {
						if (y.isactive !== '0')
							finalArr.push(y);
					});
					if (finalArr.length) {
						sortBy(finalArr, {
							prop: "cdt",
							desc: true,
							parser: function (item) {
								//ignore case sensitive
								return item;
							}
						});
					}
					return res.json({
						status: config.SUCCESS_STATUS,
						resultArr: finalArr
					});
				} else {
					return res.json({
						status: config.ERROR_STATUS,
						msg: 'No data found'
					});
				}

			}
		});
	} catch (error) {
		console.log(error);
	}
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

module.exports.findUserRole = function (req, res) {
	//if(!req.session.uid || req.session.uid!=req.body.uid)
	//return res.json({status: config.ERROR_STATUS,msg:'unauthorised user'});
	db.usergroup.find({
		'isactive': {
			$nin: ['0', 'Disable']
		}
	}, {
		"groupnm": 1
	}, function (err, result) {
		if (err) {
			console.log('err', err)
			return res.json({
				status: config.ERROR_STATUS
			});
		} else if (!result) {
			return res.json({
				status: config.SUCCESS_STATUS,
				msg: 'No users group found'
			});
		} else {

			return res.json({
				status: config.SUCCESS_STATUS,
				resultArr: result
			});
		}
	});
};
module.exports.updateGroupById = function (req, res) {
	if (!req.body.gid) {
		return res.json({
			status: config.ERROR_STATUS,
			msg: 'no record found'
		});
	}
	console.log(req.body);
	var query = {
			'_id': new ObjectID(req.body.gid)
		},
		update = {
			'groupnm': req.body.groupnm,
			'permission': req.body.permission,
			'updtby': req.body.uid
		};
	update['cdt'] = new Date();
	db.usergroup.findAndModify({
		query: query,
		update: {
			$set: update
		},
		new: false
	}, function (err, doc) {
		if (err) return res.json({
			status: config.ERROR_STATUS
		});
		else if (doc) {
			return res.json({
				status: config.SUCCESS_STATUS
			});
		} else return res.json({
			status: config.ERROR_STATUS
		});
	});
};
module.exports.findGroupById = function (req, res) {
	var id = req.query.gid;
	console.log(id);
	if (!req.query.gid) {
		return res.json({
			status: config.ERROR_STATUS,
			msg: 'no record found'
		});
	}
	var query = {
		'_id': new ObjectID(req.query.gid)
	};
	db.usergroup.find(query, {
		"cdt": 0,
		"_id": 0
	}, function (err, result) {
		if (err || result.length == 0) {
			console.log('err', err)
			return res.json({
				status: config.ERROR_STATUS,
				msg: 'no record found'
			});
		} else {
			return res.json({
				status: config.SUCCESS_STATUS,
				resultArr: result
			});
		}
	});
};

function isUserValidate(req) {
	req.checkBody('uname', 'Invalid User name.').notEmpty(); //server side validation
	req.checkBody('email', 'Invalid Email').isEmail();
	//req.checkBody('pwd', '6 to 20 characters required').len(6, 20);
	req.checkBody('fname', 'Invalid first name').isAlpha();
	req.checkBody('lname', 'Invalid last name').isAlpha();
	req.checkBody('mobile', 'Invalid Mobile').isInt();
	//req.checkBody('selectStatus', 'must enter').notEmpty();
	return req.validationErrors();
}
module.exports.creatNewUser = function (req, res) {
	//if request body is coming as blank.

	if (!req.body) {
		return res.json({
			status: config.ERROR_STATUS,
			msg: "Error! there are some error while processing your request please contact to administrator or try later."
		});
	}
	//check email exist
	var queryEmail = {
		'email': req.body.email
	};

	db.user.findOne(queryEmail, function (err, data) {
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
				msg: 'Email id already associated with another user. please try with another user email.'
			});
		} else {
			//check password  unmatched
			if (req.body.password !== req.body.repassword) {
				return res.json({
					status: config.ERROR_STATUS,
					msg: 'Password and confirm password doest not matched.'
				});
			}
		}
		//Validate with express validaor.
		var isValidate = isUserValidate(req);
		if (isValidate) {

			return res.json({
				status: config.ERROR_STATUS,
				msg: isValidate
			});
		} else { //Saved User Data
			/*set default value */
			req.body.cdt = new Date();
			req.body.createdby = req.body.uid;
			req.body.password = req.body.password;
			var encodedPwd = getEncryptedPwd(req.body.password);
			delete req.body.repassword;
			req.body.password = encodedPwd; //encript password
			/*end set default value */
			db.user.save(req.body, function (err, saved) {
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





	// var storage = multer.diskStorage({ //multers disk storage settings
	// 	destination: function (req, file, cb) {
	// 		cb(null, './images/user-profile/');
	// 	},
	// 	filename: function (req, file, cb) {
	// 		var datetimestamp = Date.now();
	// 		var newfilename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
	// 		cb(null, newfilename);
	// 	}
	// });
	// var upload = multer({ //multer settings
	// 	storage: storage,
	// }).single('image');

	// upload(req, res, function (err) {
	// 	if (err) {
	// 		res.json({
	// 			error_code: 1,
	// 			err_desc: err
	// 		});
	// 		return;
	// 	}
	// 	if (!req.body.uname) {
	// 		console.log('req.body is emplty');
	// 		if (req.file)
	// 			fs.unlink(req.file.path);
	// 		return res.json({
	// 			status: config.SUCCESS_STATUS
	// 		});
	// 	}
	// 	var isValidate = isUserValidate(req);
	// 	if (isValidate) {
	// 		console.log(isValidate);
	// 		return res.json({
	// 			status: config.ERROR_STATUS,
	// 			err: isValidate
	// 		});
	// 	}
	// 	if (req.body.password !== req.body.repassword) {
	// 		console.log('Unmatched Password');
	// 		return res.json({
	// 			status: config.ERROR_STATUS,
	// 			msg: 'Unmatched Password'
	// 		});
	// 	}
	// 	var encodedPwd = getEncryptedPwd(req.body.password);
	// 	var query = {
	// 		$or: [{
	// 			'email': req.body.email
	// 		}, {
	// 			'uname': req.body.uname
	// 		}]
	// 	};
	// 	req.body.cdt = new Date();
	// 	req.body.createdby = req.body.uid;
	// 	req.body.password = req.body.password;
	// 	delete req.body.repassword;
	// 	if (req.file)
	// 		req.body.filename = req.file.path;

	// 	db.user.findOne(query, function (err, data) {
	// 		if (err) {
	// 			printLog(err);
	// 			return res.json({
	// 				status: config.ERROR_STATUS
	// 			});
	// 		}
	// 		if (data.uname === req.body.uname) {
	// 			return res.json({
	// 				status: config.ERROR_STATUS,
	// 				msg: 'username is already exist'
	// 			});
	// 		}
	// 		if (data.email === req.body.email) {
	// 			return res.json({
	// 				status: config.ERROR_STATUS,
	// 				msg: 'email-id is already exist'
	// 			});
	// 		}

	// 		db.user.save(req.body, function (err, saved) {
	// 			if (err || !saved) {
	// 				printLog(err);
	// 				return res.json({
	// 					status: config.ERROR_STATUS
	// 				});
	// 			} else if (saved) {
	// 				return res.json({
	// 					status: config.SUCCESS_STATUS
	// 				});
	// 			}
	// 		});

	// 	});
	// });
};
module.exports.findAllUser = function (req, res) {
	var query = {};
	var getfields = {};
	if (req.body.role) {
		query = {
			role: req.body.role
		};
		getfields = {
			"filename": 1,
			"cname": 1,
			"city": 1,
			"phone": 1,
			"uname": 1,
			"isactive": 1,
			"cdt": 1
		};
	} else {
		query = {
			role: {
				$ne: 'vendor'
			}
		};
		getfields = {
			"uname": 1,
			"selectStatus": 1,
			"cdt": 1,
			"fname": 1,
			"lname": 1,
			"email": 1,
			"phone": 1,
		};
	}
	db.user.find(query, getfields, function (err, result) {
		if (err || !result) return res.json({
			status: config.ERROR_STATUS
		});
		else {
			if (result.length) {
				let finalArr = [],
					myRes = [];
				result.forEach(function (y) {
					if ((y.selectStatus && y.selectStatus !== '0') || (y.isactive && y.isactive !== '0'))
						finalArr.push(y);
				});
				if (finalArr.length) {
					sortBy(finalArr, {
						prop: "cdt",
						desc: true,
						parser: function (item) {
							//ignore case sensitive
							return item;
						}
					});
				}
				return res.json({
					status: config.SUCCESS_STATUS,
					resultArr: finalArr
				});
			} else {
				return res.json({
					status: config.ERROR_STATUS,
					msg: 'No data found'
				});
			}
		}
	});
};
module.exports.findUserById = function (req, res) {
	var id = req.query.gid;
	// if (req.body.callFrom && req.decoded.uid) {
	// 	req.body.userid = req.decoded.uid;
	// }
	var query = {
		'_id': new ObjectID(id)
	};
	db.user.find(query, {
		"repassword": 0,
		"password": 0,
		"cdt": 0,
		"uid": 0
	}, function (err, result) {
		if (err || result.length == 0) {
			console.log('err', err)
			return res.json({
				status: config.ERROR_STATUS,
				msg: 'no record found'
			});
		} else {
			return res.json({
				status: config.SUCCESS_STATUS,
				resultArr: result
			});
		}
	});
};
module.exports.updateUserById = function (req, res) {
	if (!req.body) {
		return res.json({
			status: config.ERROR_STATUS,
			msg: "Error! there are some error while processing your request please contact to administrator or try later."
		});
	}
	var _id = new ObjectID(req.body._id);
	var query = {
		$and: [{
				'email': req.body.email,
				'provider': ''
			},
			{
				'_id': {
					$ne: _id
				}
			}
		]
	};

	db.user.findOne(query, function (err, data) {
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
				msg: "Userid already exist with the same email and user id.please try with diffrent one"
			});
		} else {
			var query = {
				_id: new ObjectID(req.body._id)
			};
			console.log(query);
			db.user.update(
				query, {
					$set: {
						"name": req.body.firstName,
						"lastName": req.body.lastName,
						"email": req.body.email,
						"city": req.body.city,
						"state": req.body.state,
						"country": req.body.country,
						"phone": req.body.phone,
						"birthDate": req.body.birthDate,
						"pinCode": req.body.pinCode,
						"about": req.body.about
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
							msg: "Updated Sucessfully."
						});
					}

				}
			)

		}
	});



};

module.exports.sendResetLink = function (req, res) {
	crypto.randomBytes(20, function (err, buf) {
		var token = buf.toString('hex');
		var update = {
			$set: {
				resetPwdToken: token,
				resetPwdExp: Date.now() + 3600000
			}
		};
		var query = {
			ema: req.body.email
		};
		db.user.update(query, update, function (err, result) {
			if (err) {
				throw err;
			}
			if (result.nModified) {
				mailer.mailOptions.to = req.body.email
				mailer.mailOptions.subject = 'Reset your holiday bookers account password';
				var dte = new Date();
				dte.setTime(dte.getTime() + (dte.getTimezoneOffset() + 390) * 60 * 1000);
				mailer.mailOptions.text = 'Dear Customer,\n\n\nWe received a request to reset the password for your account. If you made this request, please click the following button:\n\n' + 'http://' + req.headers.host + '/admin/reset/' + token + '\n\n' + 'The password reset link is valid till ' + dte.toLocaleString() + ' IST.\nIf you did not request this, please ignore this email and your password will remain unchanged.\n';
				mailer.transport.sendMail(mailer.mailOptions, function (err) {
					return res.json({
						status: config.SUCCESS_STATUS,
						email: req.body.email
					});
				});
			} else {
				return res.json({
					status: config.ERROR_STATUS
				});
			}
		});
	});
};
module.exports.resetPassword = function (req, res) {
	var encodedPwd = getEncryptedPwd(req.body.pwd);
	var query = {
		'ema': req.body.email,
		resetPwdExp: {
			$gt: parseInt(req.body.resetDate)
		},
		resetPwdToken: req.body.token
	}

	update = {
		'pwd': encodedPwd
	};
	db.user.findAndModify({
		query: query,
		update: {
			$set: update
		},
		new: false
	}, function (err, doc) {
		if (err) return res.json({
			status: config.ERROR_STATUS
		});
		else if (doc) {
			return res.json({
				status: config.SUCCESS_STATUS
			});
		} else return res.json({
			status: config.ERROR_STATUS + '2'
		});
	});
};
module.exports.createVendor = function (req, res) {
	var storage = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
			cb(null, './images/vendor/');
		},
		filename: function (req, file, cb) {
			//var newfilename =file.originalname;
			var datetimestamp = Date.now();
			var newfilename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
			cb(null, newfilename);
		}
	});
	var upload = multer({
		storage: storage
	}).array('image', 3);
	upload(req, res, function (err) {
		if (err) {
			res.json({
				error_code: 1,
				err_desc: err
			});
			return;
		}

		if (!req.body.uname)
			return res.json({
				status: config.ERROR_STATUS
			});

		var query = {
				uname: req.body.uname
			},
			update = {},
			filesImgArr = {};
		if (req.files.length) {
			req.files.forEach(function (item) {
				let keyName = item.originalname.split('.');
				filesImgArr[keyName[0]] = item.path;
			});
		}
		var encodedPwd = getEncryptedPwd(req.body.password);
		var query = {
			'uname': req.body.uname
		};
		req.body.cdt = new Date();
		if (!req.decoded)
			return res.json({
				status: config.ERROR_STATUS,
				msg: 'Internal server err!'
			});
		req.body.uid = req.decoded.uid;
		req.body.password = encodedPwd;
		req.body.filename = filesImgArr;
		req.body.role = 'vendor';
		if (req.body.permission)
			req.body.permission = JSON.parse(req.body.permission);
		if (req.body.memberfrm)
			req.body.memberfrm = JSON.parse(req.body.memberfrm);
		if (req.body.percent)
			req.body.percent = JSON.parse(req.body.percent);

		db.user.findOne(query, function (err, data) {
			if (err) {
				printLog(err);
				return res.json({
					status: config.ERROR_STATUS
				});
			}
			if (data) {
				return res.json({
					status: config.ERROR_STATUS,
					msg: 'Already Exist'
				});
			}

			db.user.save(req.body, function (err, saved) {
				if (err || !saved) {
					printLog(err);
					return res.json({
						status: config.ERROR_STATUS
					});
				} else if (saved) {
					return res.json({
						status: config.SUCCESS_STATUS
					});
				}
			});

		});
	});
};
var readHTMLFile = function (path, callback) {
	fs.readFile(path, {
		encoding: 'utf-8'
	}, function (err, html) {
		if (err) {
			throw err;
			callback(err);
		} else {
			callback(null, html);
		}
	});
};
module.exports.updateVendor = function (req, res) {
	var storage = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
			cb(null, './images/vendor/');
		},
		filename: function (req, file, cb) {
			//var newfilename =file.originalname;
			var datetimestamp = Date.now();
			var newfilename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
			cb(null, newfilename);
		}
	});
	var upload = multer({
		storage: storage
	}).array('image', 3);
	upload(req, res, function (err) {
		if (err) {
			res.json({
				error_code: 1,
				err_desc: err
			});
			return;
		}
		if (req.body.callFrom && req.body.callFrom == 'vendor-profile') {
			req.body.userid = req.decoded.uid;
		}
		if (!req.body.userid)
			return res.json({
				status: config.ERROR_STATUS
			});
		var query = {
				'_id': new ObjectID(req.body.userid)
			},
			update = {};
		if (req.body.password && req.body.password !== 'undefined') {
			var encodedPwd = getEncryptedPwd(req.body.password);
			update['password'] = encodedPwd;
		}
		if (req.body.cname && req.body.cname !== 'undefined')
			update['cname'] = req.body.cname;
		if (req.body.cperson && req.body.cperson !== 'undefined')
			update['cperson'] = req.body.cperson;
		if (req.body.cdesignation && req.body.cdesignation !== 'undefined')
			update['cdesignation'] = req.body.cdesignation;
		if (req.body.phone && req.body.phone !== 'undefined')
			update['phone'] = req.body.phone;
		if (req.body.uname && req.body.uname !== 'undefined')
			update['uname'] = req.body.uname;
		if (req.body.address && req.body.address !== 'undefined')
			update['address'] = req.body.address;
		if (req.body.city && req.body.city !== 'undefined')
			update['city'] = req.body.city;
		if (req.body.map && req.body.map !== 'undefined')
			update['map'] = req.body.map;
		if (req.body.percent && req.body.percent !== 'undefined')
			update['percent'] = JSON.parse(req.body.percent);
		if (req.body.memberfrm && req.body.memberfrm !== 'undefined')
			update['memberfrm'] = JSON.parse(req.body.memberfrm);
		if (req.body.cpan && req.body.cpan !== 'undefined')
			update['cpan'] = req.body.cpan;
		if (req.body.ctin && req.body.ctin !== 'undefined')
			update['ctin'] = req.body.ctin;
		if (req.body.isactive && req.body.isactive !== 'undefined')
			update['isactive'] = req.body.isactive;
		if (req.body.permission && req.body.permission !== 'undefined')
			update['permission'] = JSON.parse(req.body.permission);

		update['cdt'] = new Date();
		if (!Object.keys(update).length)
			return res.json({
				status: config.ERROR_STATUS
			});
		db.user.findOne(query, function (err, data) {
			if (err) {
				printLog(err);
			}
			if (!data) {
				return res.json({
					status: config.ERROR_STATUS,
					msg: 'Internal server err'
				});
			}
			update['filename'] = {};
			if (data['filename']) {
				update['filename'] = data['filename'];
			}
			if (req.files.length) {
				req.files.forEach(function (item) {
					let keyName = item.originalname.split('.');
					update['filename'][keyName[0]] = item.path;
				});
			}
			db.user.findAndModify({
				query: query,
				update: {
					$set: update
				},
				new: false
			}, function (err, doc) {
				if (err) return res.json({
					status: config.ERROR_STATUS
				});
				else if (doc) {
					return res.json({
						status: config.SUCCESS_STATUS
					});
				} else return res.json({
					status: config.ERROR_STATUS
				});
			});
		});
	});
};
module.exports.deleteUserGroup = function (req, res) {
	var id = req.body.gid;
	if (!req.body.gid) {
		return res.json({
			status: config.ERROR_STATUS,
			msg: 'sorry unable to process your request.'
		});
	}
	var query = {
		'_id': new ObjectID(id)
	};
	db.usergroup.remove(query, function (err, result) {
		if (err || result.length == 0) {

			return res.json({
				status: config.ERROR_STATUS,
				msg: 'Error in your request.'
			});
		} else {
			return res.json({
				status: config.SUCCESS_STATUS,
				message: "User Group deleted sucessfully."
			});
		}
	});

};

function getEncryptedPwd(pwd) {
	return bcrypt.hashSync(pwd);
}

function printLog(msg) {
	console.log('user controller', msg);
}

module.exports.updateVendorCompany = function (req, res, next) {
	var commingfile = [];
	var panfile = '';
	var tinfile = '';
	var storage = multer.diskStorage({ //multers disk storage settings
		destination: function (req, file, cb) {
			cb(null, './images/upload/user/');
		},
		filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			var _invalid = false;
			if (!_invalid) {
				var fileName = file.originalname.split('.')[0] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]

				if (req.body.companyPANFileName === file.originalname) {
					panfile = fileName;
					req.body.PanFileName = fileName;
					//commingfile.push(file.originalname);
					cb(null, fileName);

				}
				if (req.body.companyTINDocumentFileName === file.originalname) {
					tinfile = fileName;
					req.body.TINFileName = fileName;
					cb(null, fileName);
				}
			}

		}
	});
	var upload = multer({
		storage: storage
	}).any();

	upload(req, res, function (err) {
		if (err) {
			return res.json({
				status: config.ERROR_STATUS,
				msg: err
			});
		} else {
			var query = {
				_id: new ObjectID(req.body.userID)
			};

			db.user.update(
				query, {
					$set: {
						"companyName": req.body.companyName,
						"companyAddress": req.body.companyAddress,
						"companyContactPerson": req.body.companyContactPerson,
						"companyOfficeEmail": req.body.companyOfficeEmail,
						"contactpersonDesignation": req.body.contactpersonDesignation,
						"companyPhone": req.body.companyPhone,
						"tinFilePath": '/images/upload/user/' + req.body.TINFileName,
						"panFilePath": '/images/upload/user/' + req.body.PanFileName,
						"companyPAN": req.body.companyPAN,
						"companyTINNo": req.body.companyTINNo
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
							msg: "Updated Sucessfully."
						});
					}

				}
			)
		};
	})
}