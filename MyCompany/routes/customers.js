
/*
 * GET home page.
 */

var mongorepo = require('../libs/mongorepo.js');

var repository;

function index(req, res) {
    repository.findAll(function (err, items) {
        if (err)
            res.render('error', { error: err });
        else
            res.render('customers', { title: 'Customers', items: items });
    });
}

function create(req, res) {
    res.render('customernew', { title: 'New Customer' });
}

function insert(req, res) {    
    repository.save({ name: req.param('name'), address: req.param('address') }, function (err, item) {
        if (err)
            res.render('error', { error: err});
        else
            index(req, res);
    });
}

function view(req, res) {
    repository.findById(req.params.id, function(err, item) {
        if (err)
            res.render('error', { error: err});
        else
            res.render('customer', { title: 'Customer', item: item });
    });
}

exports.initialize = function (db) {
    repository = mongorepo.createRepository(db, 'customer');
};

exports.index = index;
exports.create = create;
exports.insert = insert;
exports.view = view;
