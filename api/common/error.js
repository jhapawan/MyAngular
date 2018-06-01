function ErrorController() {}
module.exports.handleError = function (error, next) {
    // throw new Error(error);
    Promise.resolve().then(function () {
        //throw new Error(error)
        // console.log("Error");
        throw new Error("Error");
    }).catch(function (err) {
        console.log(err);

    })
}