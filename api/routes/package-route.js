package = require('../controller/package.js');


module.exports = function (app, controller) {

    /**Get Section*/

    app.get('/api/package/getallpackage', package.getPackage);
    app.get('/api/package/getpackagebyid', package.getPackagebyid);

    /**End Get Section */

    /**post Section*/
    app.post('/api/package/savepackage', package.savePackage);
    app.post('/api/package/updatepackage', package.updatePackage);
    app.post('/api/package/updatepackagedetails', package.updatePackageDetails);
    app.post('/api/package/updatepackageitinery', package.updatePackageItinery);
    app.post('/api/package/updatepackagenotes', package.updatePackageNotes);
    app.post('/api/package/updatepackageimage', package.updatePackageImages);
    /**End post Section */
}
