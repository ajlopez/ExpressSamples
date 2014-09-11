var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({ name: 'Adam', age: 800 });
});

module.exports = router;
