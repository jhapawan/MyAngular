blog = require('../controller/blog.js');


module.exports = function (app, controller) {

    /**Get Section*/

    // app.get('/api/product/getproduct', blog.viewAllProduct);
    //  app.get('/api/blog/getallblog', blog.getAllPublicBlog);

    /**End Get Section */

    /**post Section*/
    app.post('/api/blog/saveblogpost', blog.addBlog);


    // app.post('/api/package/updatepackage', package.updatePackage);
    // app.post('/api/package/updatepackagedetails', package.updatePackageDetails);
    // app.post('/api/package/updatepackageitinery', package.updatePackageItinery);
    // app.post('/api/package/updatepackagenotes', package.updatePackageNotes);
    // app.post('/api/package/updatepackageimage', package.updatePackageImages);
    /**End post Section */
}