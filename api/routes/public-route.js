blog = require('../controller/blog.js');


module.exports = function (app, controller) {

    /**Get Section*/

    // app.get('/api/product/getproduct', blog.viewAllProduct);
    app.get('/api/public/getallblog', blog.getAllPublicBlog);

    /**End Get Section */


}