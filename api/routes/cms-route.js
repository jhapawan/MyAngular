product = require('../controller/product-cms.js');


module.exports = function (app, controller) {

    /**Get Section*/

    app.get('/api/product/getproduct', product.viewAllProduct);
    app.get('/api/product/getproductbyid', product.viewProductById);

    /**End Get Section */

    /**post Section*/
    app.post('/api/product/saveproduct', product.saveProduct);
    app.post('/api/product/updateproduct', product.updateProduct);
    
    // app.post('/api/package/updatepackage', package.updatePackage);
    // app.post('/api/package/updatepackagedetails', package.updatePackageDetails);
    // app.post('/api/package/updatepackageitinery', package.updatePackageItinery);
    // app.post('/api/package/updatepackagenotes', package.updatePackageNotes);
    // app.post('/api/package/updatepackageimage', package.updatePackageImages);
    /**End post Section */
}
