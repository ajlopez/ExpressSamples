
var customers = require('../routes/customers.js'),
    mongorepo = require('../libs/mongorepo.js');

var db;
var req = { };
var res = { };

exports["Open database"] = function (test) {
    test.expect(0);
    
    db = mongorepo.openDatabase('mycompany-test', 'localhost', 27017, function () {
        customers.initialize(db); 
        test.done();
    });
};

exports["Find all"] = function (test) {
    test.expect(7);
    
    res.render = function (name, model) {
        test.ok(name);
        test.ok(model);
        test.equal(name, 'customerlist');
        test.ok(model.title);
        test.equal(model.title, 'Customers');
        test.ok(model.items);
        test.ok(Array.isArray(model.items));
        test.done();
    };
    
    customers.index(req, res);
};

exports["Close database"] = function (test) {
    db.close();
    test.done();
};