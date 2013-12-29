
var customers = require('../routes/customers.js'),
    mongorepo = require('../libs/mongorepo.js');

var db;
var req = { };
var res = { };
var repository;

exports["Open database"] = function (test) {
    test.async();
    
    db = mongorepo.openDatabase('mycompany-test', 'localhost', 27017, function () {
        customers.initialize(db); 
        repository = mongorepo.createRepository(db, 'customer');
        test.done();
    });
};

exports["Get index"] = function (test) {
    test.async();
    
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

exports["Get create"] = function (test) {
    test.async();
    
    res.render = function (name, model) {
        test.ok(name);
        test.ok(model);
        test.equal(name, 'customernew');
        test.ok(model.title);
        test.equal(model.title, 'New Customer');
        test.done();
    };
    
    customers.create(req, res);
};

exports["Insert and Get view"] = function (test) {
    test.async();
    
    res.render = function (name, model) {
        test.ok(name);
        test.ok(model);
        test.equal(name, 'customerview');
        test.ok(model.title);
        test.equal(model.title, 'Customer');
        test.ok(model.item);
        test.equal(model.item.name, "Customer 1");
        test.equal(model.item.address, "Address 1");
        test.done();
    };
    
    repository.insert({ name: "Customer 1", address: "Address 1"}, function (err, items) {
        test.equal(err, null);
        test.ok(items);
        var item = items[0];
        var req = { params: { id: item._id.toString() } };
        customers.view(req, res);
    });
};

exports["Insert Customer"] = function (test) {
    test.async();
    
    res.render = function (name, model) {
        test.ok(name);
        test.ok(model);
        test.equal(name, 'customerlist');
        test.ok(model.title);
        test.equal(model.title, 'Customers');
        test.done();
    };
    
    req = {
        param: function (name) {
            if (name == 'name')
                return 'New Customer';
            if (name == 'address')
                return 'New Address';
        }
    }
    
    customers.insert(req, res);
};

exports["Close database"] = function (test) {
    db.close();
    test.done();
};
