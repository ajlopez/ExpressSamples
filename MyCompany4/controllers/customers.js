
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
            res.render('customerlist', { title: 'Customers', items: items });
    });
}

function create(req, res) {
    res.render('customernew', { title: 'New Customer' });
}

function insert(req, res) {    
    repository.insert({ name: req.param('name'), address: req.param('address') }, function (err, item) {
        if (err)
            res.render('error', { error: err});
        else
            index(req, res);
    });
}

function update(req, res) {
    repository.update(req.params.id, { name: req.param('name'), address: req.param('address') }, function (err, item) {
        if (err)
            res.render('error', { title: 'Error', error: err});
        else
            view(req, res);
    });
}

function remove(req, res) {
    repository.remove(req.params.id, function (err, item) {
        if (err)
            res.render('error', { title: 'Error', error: err});
        else
            index(req, res);
    });
}

function view(req, res) {
    repository.findById(req.params.id, function(err, item) {
        if (err)
            res.render('error', { error: err});
        else
            res.render('customerview', { title: 'Customer', item: item });
    });
}

function edit(req, res) {
    repository.findById(req.params.id, function(err, item) {
        if (err)
            res.render('error', { error: err});
        else
            res.render('customeredit', { title: 'Customer', item: item });
    });
}

exports.initialize = function (db) {
    repository = mongorepo.createRepository(db, 'customer');
};

exports.index = index;
exports.create = create;
exports.insert = insert;
exports.view = view;
exports.edit = edit;
exports.update = update;
exports.remove = remove;
