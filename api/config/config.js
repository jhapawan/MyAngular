var config = {};

config.mongodb = {};
config.server = {};
config.http = {};
config.email = {};

config.constantValue = {};

config.server.port = process.env.WEB_PORT || 9999;
config.mongodb.username = process.env.MONGODB_USERNAME || 'ankita';
config.mongodb.password = process.env.MONGODB_PASSWORD || 'root';
config.mongodb.host = process.env.MONGODB_HOST || 'ds139899.mlab.com';
config.mongodb.port = process.env.MONGODB_PORT || 39899;
config.mongodb.databaseName = process.env.MONGODB_NAME || 'holiday-bookers';

/*Constant value for Http*/
config.http.errorStatus = 'error';
config.http.sucessStatus = 'success';
config.ERROR_STATUS = 'error';
config.SUCCESS_STATUS = 'success';

config.constantValue.apiSecret = "MyApp";
config.email.accountFrom = "contributeskill@gmail.com";
config.email.accountPassword = "May@1988";

module.exports = config;