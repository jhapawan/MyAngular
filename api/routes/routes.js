/*define controller*/

user = require('../controller/user.js');
hotel = require('../controller/hotel.js');
master = require('../controller/master.js');
common = require('../controller/common.js');

var express = require('express');
bodyParser = require('body-parser');
multer = require('multer');
app = express();
var upload = multer()

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({
    extended: true
})

module.exports = function (app, controller) {

    /*User Api*/
    app.get('/api/user/checkuserexists', user.isUserExist);
    app.get('/api/user/findallgroup', user.findAllGroup);
    app.get('/api/user/finduserrole', user.findUserRole);
    app.get('/api/user/findgroupbyid', user.findGroupById);
    app.get('/api/user/findalluser', user.findAllUser);
    app.get('/api/user/finduserbyid', user.findUserById);
    app.post('/api/user/updatevendor', user.updateVendor);
    app.post('/api/user/createvendor', user.createVendor);
    app.post('/api/user/resetpassword', user.resetPassword);
    app.post('/api/user/sendresetlink', user.sendResetLink);
    app.post('/api/user/updateuserbyid', user.updateUserById);
    app.post('/api/user/creatnewuser', user.creatNewUser);
    app.post('/api/user/addexeperience', user.addExperience);
    app.post('/api/user/addeducation', user.addEducation);
    app.post('/api/user/addskill', user.addSkill);
    app.post('/api/user/updateprofiledetails', user.updateExperienceEducation);
    app.post('/api/user/updateGroupbyid', user.updateGroupById);
    app.post('/api/user/updatepassword', user.updatePassword);
    app.post('/api/user/createusergroup', user.creatUserGroup);
    app.post('/api/user/deleteusergroup', user.deleteUserGroup);
    app.post('/api/user/updatevendorcompany', user.updateVendorCompany);
    app.post('/api/common/updatefile', common.uploadFile);


    /*Master Data  */
    app.post('/api/master/saveroomcategory', master.saveRoomCategory);
    app.get('/api/master/getroomcategory', master.getRoomCategory);

    app.post('/api/master/savepackagetype', master.savePackageType);
    app.get('/api/master/getpackagetype', master.getPackageType);
    app.get('/api/master/gettransporttyppe', master.getTransportType);
    app.post('/api/master/savetransporttype', master.saveTransportType);
    app.post('/api/master/savemenu', master.saveMenu);
    app.get('/api/master/getallmenu', master.getAllMenu);
    app.post('/api/master/saverole', master.saveRole);
    app.get('/api/master/getallrole', master.getAllRole);

    /*End Master Data  */
    /*End User Api*/
    /*Hotel*/
    app.get('/api/hotel/getallhotel', hotel.viewAllHotel);
    app.post('/api/hotel/savehotel', hotel.saveHotel);
    app.post('/api/hotel/updatehotel', hotel.updateHotel);
    app.post('/api/hotel/savehotelbooking', hotel.saveHotelBooking);
    app.post('/api/hotel/saveareaofattraction', hotel.saveAreaOfAttraction);
    app.post('/api/hotel/saverate', hotel.saveRate);
    app.post('/api/hotel/savefacilitiesservices', hotel.saveFacilitiesServices);
    app.post('/api/hotel/saveroomamenities', hotel.saveRoomAmenities);
    app.post('/api/hotel/savegalary', hotel.saveGalaryImage);
    app.get('/api/hotel/viewhotelbyid', hotel.viewHotelById);


    /*End Hotel*/

}