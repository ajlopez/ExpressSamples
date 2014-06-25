var express = require('express');
var router = express.Router();

var site = require('../site.json');

/* GET home page. */
router.get('/', makeAction('home'));

for (var name in site.pages)
    router.get('/' + name, makeAction(name));

function makeAction(name) {
    return function(req, res) { process(req, res, name); }
}

function process(req, res, name) {
    var page = site.pages[name];
    
    res.render('page', { title: page.title, text: page.text });
}

module.exports = router;
