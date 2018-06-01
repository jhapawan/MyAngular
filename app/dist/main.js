(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<!-- <div style=\"text-align:center\">\n  <h1>\n    Welcome to {{title}}!\n  </h1>\n  <img width=\"300\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<h2>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul> -->\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _services_services_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services.module */ "./src/app/services/services.module.ts");
/* harmony import */ var _social_signup_social_signup_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./social-signup/social-signup.module */ "./src/app/social-signup/social-signup.module.ts");
/* harmony import */ var _route_app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route/app-routing.module */ "./src/app/route/app-routing.module.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _login_login_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.module */ "./src/app/login/login.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"], _login_login_module__WEBPACK_IMPORTED_MODULE_4__["LoginModule"], _route_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _social_signup_social_signup_module__WEBPACK_IMPORTED_MODULE_1__["SocialSignupModule"], _services_services_module__WEBPACK_IMPORTED_MODULE_0__["ServicesModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(https://fonts.googleapis.com/css?family=Roboto:400,300,500);\r\n*:focus {\r\n  outline: none;\r\n}\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  background: #DDD;\r\n  font-size: 16px;\r\n  color: #222;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: 300;\r\n}\r\n#login-box {\r\n  position: relative;\r\n  margin: 5% auto;\r\n  width: 600px;\r\n  height: 400px;\r\n  background: #FFF;\r\n  border-radius: 2px;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\r\n}\r\n.left {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  box-sizing: border-box;\r\n  padding: 40px;\r\n  width: 300px;\r\n  height: 400px;\r\n}\r\nh1 {\r\n  margin: 0 0 20px 0;\r\n  font-weight: 300;\r\n  font-size: 28px;\r\n}\r\ninput[type=\"text\"],\r\ninput[type=\"password\"] {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin-bottom: 20px;\r\n  padding: 4px;\r\n  width: 220px;\r\n  height: 32px;\r\n  border: none;\r\n  border-bottom: 1px solid #AAA;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: 400;\r\n  font-size: 15px;\r\n  transition: 0.2s ease;\r\n}\r\ninput[type=\"text\"]:focus,\r\ninput[type=\"password\"]:focus {\r\n  border-bottom: 2px solid #16a085;\r\n  color: #16a085;\r\n  transition: 0.2s ease;\r\n}\r\ninput[type=\"submit\"] {\r\n  margin-top: 28px;\r\n  width: 120px;\r\n  height: 32px;\r\n  background: #16a085;\r\n  border: none;\r\n  border-radius: 2px;\r\n  color: #FFF;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: 500;\r\n  text-transform: uppercase;\r\n  transition: 0.1s ease;\r\n  cursor: pointer;\r\n}\r\ninput[type=\"submit\"]:hover,\r\ninput[type=\"submit\"]:focus {\r\n  opacity: 0.8;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\r\n  transition: 0.1s ease;\r\n}\r\ninput[type=\"submit\"]:active {\r\n  opacity: 1;\r\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);\r\n  transition: 0.1s ease;\r\n}\r\n.or {\r\n  position: absolute;\r\n  top: 180px;\r\n  left: 280px;\r\n  width: 40px;\r\n  height: 40px;\r\n  background: #DDD;\r\n  border-radius: 50%;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\r\n  line-height: 40px;\r\n  text-align: center;\r\n}\r\n.right {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  box-sizing: border-box;\r\n  padding: 40px;\r\n  width: 300px;\r\n  height: 400px;\r\n  background: url('https://goo.gl/YbktSj');\r\n  background-size: cover;\r\n  background-position: center;\r\n  border-radius: 0 2px 2px 0;\r\n}\r\n.right .loginwith {\r\n  display: block;\r\n  margin-bottom: 40px;\r\n  font-size: 28px;\r\n  color: #222;\r\n  text-align: center;\r\n}\r\nbutton.social-signin {\r\n  margin-bottom: 20px;\r\n  width: 220px;\r\n  height: 36px;\r\n  border: none;\r\n  border-radius: 2px;\r\n  color: #FFF;\r\n  font-family: 'Roboto', sans-serif;\r\n  font-weight: 500;\r\n  transition: 0.2s ease;\r\n  cursor: pointer;\r\n}\r\nbutton.social-signin:hover,\r\nbutton.social-signin:focus {\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);\r\n  transition: 0.2s ease;\r\n}\r\nbutton.social-signin:active {\r\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);\r\n  transition: 0.2s ease;\r\n}\r\nbutton.social-signin.facebook {\r\n  background: #32508E;\r\n}\r\nbutton.social-signin.twitter {\r\n  background: #55ACEE;\r\n}\r\nbutton.social-signin.google {\r\n  background: #DD4B39;\r\n}\r\nbody\r\n{\r\n text-align:center;\r\n width:100%;\r\n margin:0 auto;\r\n padding:0px;\r\n font-family:\"lucida grande\",tahoma,verdana,arial,sans-serif;\r\n background: linear-gradient(white, #D3D8E8);\r\n}\r\n#header_wrapper\r\n{\r\n width:100%;\r\n min-width:980px;\r\n background-color:#4c66a4;\r\n}\r\n#header\r\n{\r\n width:980px;\r\n margin:0px auto;\r\n padding:0px;\r\n height:85px;\r\n}\r\n#header li\r\n{\r\n list-style-type:none;\r\n float:left;\r\n text-align:left;\r\n color:white;\r\n}\r\n#header #sitename\r\n{\r\n margin-top:25px;\r\n}\r\n#header #sitename a\r\n{\r\n color:white;\r\n text-decoration:none;\r\n font-size:30px;\r\n font-weight:900;\r\n}\r\n#header form\r\n{\r\n margin-top:15px;\r\n float:right;\r\n}\r\n#header form li\r\n{\r\n font-size:13px;\r\n margin-left:15px;\r\n}\r\n#header form li a\r\n{\r\n color:#A9BCF5;\r\n text-decoration:none;\r\n}\r\n#header form input[type=\"text\"]\r\n{\r\n margin-top:3px;\r\n margin-bottom:3px;\r\n width:150px;\r\n border:1px solid #08298A;\r\n height:25px;\r\n padding-left:3px;\r\n}\r\n#header form input[type=\"password\"]\r\n{\r\n margin-top:3px;\r\n margin-bottom:3px;\r\n width:150px;\r\n border:1px solid #08298A;\r\n height:25px;\r\n padding-left:3px;\r\n}\r\n#header form input[type=\"submit\"]\r\n{\r\n height:25px;\r\n margin-top:20px;\r\n background-color:#084B8A;\r\n color:white;\r\n border:1px solid #08298A;\r\n}\r\n#wrapper\r\n{\r\n margin:0 auto;\r\n padding:0px;\r\n text-align:center;\r\n width:980px;\r\n}\r\n#wrapper div\r\n{\r\n float:left;\r\n font-family: helvetica, arial, sans-serif;\r\n}\r\n#wrapper #div1\r\n{\r\n margin-top:30px;\r\n width:590px;\r\n text-align:left;\r\n}\r\n#wrapper #div1 p\r\n{\r\n font-size:20px;\r\n font-family:arial;\r\n font-weight:bold;\r\n margin:0px;\r\n color:#0e385f;\r\n}\r\n#wrapper #div2\r\n{\r\n margin-top:10px;\r\n width:390px;\r\n text-align:left;\r\n}\r\n#wrapper #div2 h1\r\n{\r\n margin:0px;\r\n font-size:37px;\r\n color:#2E2E2E;\r\n}\r\n#wrapper #div2 p\r\n{\r\n font-size:18px;\r\n color:#2E2E2E;\r\n}\r\n#wrapper #div2 li\r\n{\r\n list-style-type:none;\r\n margin-top:10px;\r\n}\r\n#wrapper #div2 li #firstname\r\n{\r\n width:49%;\r\n}\r\n#wrapper #div2 li #surname\r\n{\r\n margin-left:2%;\r\n width:49%;\r\n}\r\n#wrapper #div2 li input[type=\"text\"]\r\n{\r\n width:100%;\r\n height:40px;\r\n border-radius:5px;\r\n padding-left:10px;\r\n font-size:18px;\r\n border:1px solid #BDBDBD;\r\n}\r\n#wrapper #div2 li input[type=\"password\"]\r\n{\r\n width:100%;\r\n height:40px;\r\n border-radius:5px;\r\n padding-left:10px;\r\n font-size:18px;\r\n border:1px solid #BDBDBD;\r\n}\r\n#wrapper #div2 li select\r\n{\r\n padding:4px;\r\n float:left;\r\n}\r\n#wrapper #div2 li a\r\n{\r\n margin-left:10px;\r\n width:150px;\r\n color:#045FB4;\r\n text-decoration:none;\r\n font-size:11px;\r\n display: inline-block;\r\n vertical-align: middle;\r\n line-height:15px;\r\n}\r\n#wrapper #div2 li a:hover\r\n{\r\n text-decoration:underline;\r\n}\r\n#wrapper #div2 li\r\n{\r\n color:#2E2E2E;\r\n font-size:18px;\r\n}\r\n#wrapper #div2 #terms\r\n{\r\n color:#424242;\r\n font-size:11px;\r\n}\r\n#wrapper #div2 #terms a\r\n{\r\n display:inline;\r\n margin:0px;\r\n}\r\n#wrapper #div2 li input[type=\"submit\"]\r\n{\r\n width:205px;\r\n height:45px;\r\n text-align:center;\r\n font-size:19px;\r\n margin-top: 10px;\r\n margin-bottom: 10px;\r\n font-family: 'Freight Sans Bold', helvetica, arial, sans-serif !important;\r\n font-weight: bold !important;\r\n background: linear-gradient(#67ae55, #578843);\r\n background-color: #69a74e;\r\n box-shadow: inset 0 1px 1px #a4e388;\r\n border-color: #3b6e22 #3b6e22 #2c5115;\r\n border: 1px solid;\r\n border-radius: 5px;\r\n color: #fff;\r\n cursor: pointer;\r\n display: inline-block;\r\n position: relative;\r\n text-shadow: 0 1px 2px rgba(0,0,0,.5);\r\n}\r\n#wrapper #div2 #create_page\r\n{\r\n color:#424242;\r\n font-size:13px;\r\n font-weight:bold;\r\n}\r\n#wrapper #div2 #create_page a\r\n{\r\n display:inline;\r\n margin:0px;\r\n font-size:13px;\r\n}\r\n#footer_wrapper\r\n{\r\n width:100%;\r\n clear:both;\r\n float:left;\r\n margin-top:30px;\r\n min-width:995px;\r\n background-color:white;\r\n text-align:left;\r\n}\r\n#footer1\r\n{\r\n width:980px;\r\n margin:0px auto;\r\n padding:0px;\r\n border-bottom:1px solid #E6E6E6;\r\n height:30px;\r\n line-height:30px;\r\n font-size:12px;\r\n color:#848484;\r\n}\r\n#footer1 a\r\n{\r\n color:#365899;\r\n display:inline;\r\n margin-left:10px;\r\n text-decoration:none;\r\n}\r\n#footer1 a:hover\r\n{\r\n text-decoration:underline;\r\n}\r\n#footer2\r\n{\r\n width:980px;\r\n margin:0px auto;\r\n padding:0px;\r\n font-size:12px;\r\n color:#848484;\r\n}\r\n#footer2 a\r\n{\r\n color:#365899;\r\n display:inline-block;\r\n margin:5px;\r\n margin-left:0px;\r\n min-width:80px;\r\n text-decoration:none;\r\n}\r\n#footer2 a:hover\r\n{\r\n text-decoration:underline;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"\"></div>\n<div id=\"login-box\">\n  <div class=\"left\">\n    <h1>Sign up</h1>\n\n    <input type=\"text\" name=\"username\" placeholder=\"Username\" />\n    <input type=\"text\" name=\"email\" placeholder=\"E-mail\" />\n    <input type=\"password\" name=\"password\" placeholder=\"Password\" />\n    <input type=\"password\" name=\"password2\" placeholder=\"Retype password\" />\n    <input type=\"submit\" name=\"signup_submit\" value=\"Sign me up\" />\n  </div>\n\n  <div class=\"right\">\n    <span class=\"loginwith\">Sign in with</span>\n\n    <button (click)=\"socialSignIn('facebook')\" class=\"social-signin facebook\">Log in with facebook</button>\n    <button (click)=\"socialSignIn('google')\" class=\"social-signin google\">Log in with Google</button>\n    <button class=\"social-signin google\">Existing User?Log In</button>\n  </div>\n  <div class=\"or\">OR</div>\n</div> -->\n\n\n<!-- Navigation -->\n<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark fixed-top\">\n    <div class=\"container\">\n      <a class=\"navbar-brand\" href=\"#\">Pawan Jha</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarResponsive\" aria-controls=\"navbarResponsive\"\n        aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                <span class=\"navbar-toggler-icon\"></span>\n              </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarResponsive\">\n        <ul class=\"navbar-nav ml-auto\">\n          <li class=\"nav-item active\">\n            <a class=\"nav-link\" [routerLink]='[\"/page/home\"]'>Home\n                      <span class=\"sr-only\">(current)</span>\n                    </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" [routerLink]='[\"/page/about\"]'>About</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Services</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\">Contact</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n  "

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular5-social-login */ "./node_modules/angular5-social-login/angular5-social-login.umd.js");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular5_social_login__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(socialAuthService) {
        this.socialAuthService = socialAuthService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.socialSignIn = function (socialPlatform) {
        var socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = angular5_social_login__WEBPACK_IMPORTED_MODULE_1__["FacebookLoginProvider"].PROVIDER_ID;
        }
        else if (socialPlatform == "google") {
            socialPlatformProvider = angular5_social_login__WEBPACK_IMPORTED_MODULE_1__["GoogleLoginProvider"].PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(function (userData) {
            console.log(socialPlatform + " sign in data : ", userData);
            // Now sign-in with userData
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [angular5_social_login__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/route/app-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/route/app-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../login/login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var appRoute = [
    // {
    //   path: 'customers',
    //   loadChildren: 'app/customers/customers.module#CustomersModule'
    // },
    // {
    //   path: 'orders',
    //   loadChildren: 'app/orders/orders.module#OrdersModule'
    // },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoute)
            ],
            declarations: [],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/services/services.module.ts":
/*!*********************************************!*\
  !*** ./src/app/services/services.module.ts ***!
  \*********************************************/
/*! exports provided: ServicesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicesModule", function() { return ServicesModule; });
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular5-social-login */ "./node_modules/angular5-social-login/angular5-social-login.umd.js");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular5_social_login__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/esm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ServicesModule = (function () {
    function ServicesModule() {
    }
    ServicesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [],
            providers: [angular5_social_login__WEBPACK_IMPORTED_MODULE_0__["AuthService"]]
        })
    ], ServicesModule);
    return ServicesModule;
}());



/***/ }),

/***/ "./src/app/shared/config.ts":
/*!**********************************!*\
  !*** ./src/app/shared/config.ts ***!
  \**********************************/
/*! exports provided: appConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appConfig", function() { return appConfig; });
var appConfig = {
    // apiUrl: 'http://localhost:81/api'
    apiUrl: 'http://localhost:9999/api/',
    imageurl: 'http://localhost:65082',
    faceBookClientId: '118971861612474',
    googleClientId: '344798275629-32k4sauop9gjus06cguhnb1lhu4fj6rj.apps.googleusercontent.com'
};


/***/ }),

/***/ "./src/app/social-signup/social-signup.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/social-signup/social-signup.module.ts ***!
  \*******************************************************/
/*! exports provided: getAuthServiceConfigs, SocialSignupModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuthServiceConfigs", function() { return getAuthServiceConfigs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialSignupModule", function() { return SocialSignupModule; });
/* harmony import */ var _shared_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../shared/config */ "./src/app/shared/config.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular5-social-login */ "./node_modules/angular5-social-login/angular5-social-login.umd.js");
/* harmony import */ var angular5_social_login__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular5_social_login__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// Configs 
function getAuthServiceConfigs() {
    var config = new angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthServiceConfig"]([
        {
            id: angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["FacebookLoginProvider"].PROVIDER_ID,
            provider: new angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["FacebookLoginProvider"](_shared_config__WEBPACK_IMPORTED_MODULE_0__["appConfig"].faceBookClientId)
        },
        {
            id: angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"].PROVIDER_ID,
            provider: new angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["GoogleLoginProvider"](_shared_config__WEBPACK_IMPORTED_MODULE_0__["appConfig"].googleClientId)
        },
    ]);
    return config;
}
var SocialSignupModule = (function () {
    function SocialSignupModule() {
    }
    SocialSignupModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["SocialLoginModule"]
            ],
            providers: [
                {
                    provide: angular5_social_login__WEBPACK_IMPORTED_MODULE_3__["AuthServiceConfig"],
                    useFactory: getAuthServiceConfigs
                }
            ],
            declarations: []
        })
    ], SocialSignupModule);
    return SocialSignupModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Pawan\2019\MyApp\App\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map