var express = require('express');
var router = express.Router();
var lj = require('loadjsons');

var site = lj.load('content/site');

/* GET home page. */
router.get('/', makeAction('home'));

for (var name in site.pages)
    router.get('/' + name, makeAction(name));

function makeAction(name) {
    return function(req, res) { process(req, res, name); }
}

function process(req, res, name) {
    var page = site.pages[name];
    
    res.render('page', { title: page.title, text: page.text, parts: page.parts });
}

module.exports = router;
