
/*
 * GET home page.
 */

var mongorepo = require('../libs/mongorepo.js');

var repository;

exports.initialize = function(db) {
    repository = mongorepo.createRepository(db, 'customer');
};

exports.index = function(req, res) {
    repository.findAll(function (err, items) {
        if (err)
            res.render('error', { error: err });
        else
            res.render('customers', { title: 'Customers', items: items });
    });
};

