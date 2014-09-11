var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send([
        { name: 'Adam', age: 900 },
        { name: 'Eve', age: 700 }
        ]);
});

module.exports = router;
