
var customers = require('../routes/customers.js'),
    mongorepo = require('../libs/mongorepo.js');

var db = mongorepo.openDatabase('mycompany-test', 'localhost', 27017, function () { dbopened = true; runcbs() });
var dbopened = false
customers.initialize(db); 

var cbs = [ ];

function runcbs() {
    while (cbs.length) {
        cb = cbs.shift();
        cb();
    }
};

function runcb(cb) {
    if (dbopened)
        cb();
    else
        cbs.push(cb);
};

var req = { };
var res = { };

exports["Find all"] = function(test) {
    test.expect(7);
    
    res.render = function(name, model) {
        test.ok(name);
        test.ok(model);
        test.equal(name, 'customerlist');
        test.ok(model.title);
        test.equal(model.title, 'Customers');
        test.ok(model.items);
        test.ok(Array.isArray(model.items));
        test.done();
    };
    
    runcb(function() { customers.index(req, res) });
};