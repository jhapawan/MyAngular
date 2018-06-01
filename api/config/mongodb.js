var MongoClient = require('mongodb').MongoClient;
var util = require('util');
var config = require('./config.js');
var _db;

var uri = util.format('mongodb://%s%s@%s:%d/%s',
  config.mongodb.username,
  config.mongodb.password,
  config.mongodb.host,
  config.mongodb.port,
  config.mongodb.databaseName);

module.exports = {
  connectToServer: function (callback) {
    /** Connect to the Mongo database at the URI using the client **/
    MongoClient.connect(uri, {
      auto_reconnect: true
    }, function (err, db) {
      if (err) throw err;
      else if (!db) console.log('Unknown error connecting to database');
      else {
        console.log('Connected to MongoDB database server at:');
        console.log('\n\t%s\n', uri);
        _db = db;
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  }
};
module.exports.database = function () {
  // let dbUrl = 'mongodb://ankita:root@ds139899.mlab.com:39899/holiday-bookers';
  let dbUrl = 'mongodb://127.0.0.1:27017/Myapp';
  
  let db = require('mongojs')(dbUrl, [], {
    //connectionTimeout: 30000
  });
  db.on('error', function () {
    console.log('we had an error.');

  });
  db.on('timeout', function (err) {
    console.log('database timeout');
  });
  return db;
};