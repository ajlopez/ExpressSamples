
var mongodb = require('mongodb');

function Repository(db, name) {
    function getCollection(callback) {
        db.collection(name, function (err, collection) {
            if (err)
                callback(err);
            else
                callback(null, collection);
        });
    }
    
    this.findAll = function (callback) {
        getCollection(function (err, collection) {
            if (err)
                callback(err);
            else {
                collection.find().toArray(function (err, collection) {
                    if (err)
                        callback(err);
                    else
                        callback(null, collection);
                });
            }
        });
    };
    
    this.save = function (item, callback) {
        getCollection(function (err, collection) {
            if (err)
                callback(err);
            else
                collection.insert(item, callback);
        });
    };
    
    this.findById = function (id, callback) {
        getCollection(function (err, collection) {
            if (err)
                callback(err);
            else
                collection.findOne({ _id: collection.db.bson_serializer.ObjectID.createFromHexString(id) }, callback);
        });
    };
};

module.exports = {
    createRepository: function (db, name) { return new Repository(db, name); },
    openDatabase: function (dbname, host, port) {
        var db = new mongodb.Db(dbname, new mongodb.Server(host, port, {auto_reconnect: true}, {}), { safe: true  });
        db.open(function() { });
        return db;
    }
};

