var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {
    connectToServer: function(url, initScript, callback) {
        MongoClient.connect(url, function(err, db) {
            _db = db;
            console.log('Database Created');
            initScript(err, _db);
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }
};