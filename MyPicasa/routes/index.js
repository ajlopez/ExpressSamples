
var https = require('https');
var url = require('url');
var xml2js = require('xml2js');

function read(feedurl, cb) {
    var urldata = url.parse(feedurl);
    
    var options = {
        host: urldata.hostname,
        port: urldata.port,
        path: urldata.path,
        method: 'GET'
    };
    
    var parser = new xml2js.Parser();
    
    var req = https.request(options, function(res) {
        var buffer = '';

        res.on('data', function(d) {
            var text = d.toString();
            buffer += text;
        });

        res.on('err', function(err) {
            cb(err);
        });

        res.on('end', function(d) {
            if (d) {
                var text = d.toString();
                buffer += text;
            }

            parser.parseString(buffer, function (err, data) { cb(err, data) });
        });
    });

    req.end();    
}

function search(query, cb) {
    var urlapi= 'https://picasaweb.google.com/data/feed/api/all?q=' + query + '&max-results=10';
    
    console.log(urlapi);
    
    read(urlapi, function (err, data) {
        if (err) {
            cb(err, null);
            return;
        }
        
        var photos = [];
        
        data.feed.entry.forEach(function (entry) {
            entry.content.forEach(function (content) {
                photos.push({ src: content.$.src });
            });
        });
        
        cb(null, photos);
    });
}

exports.index = function(req, res){
    var model = { title: 'My Picasa' };
    
    if (req.param('q'))
        search(req.param('q'), function (err, photos) {
            model.q = req.param('q');
            
            if (err)
                model.error = err;
            else
                model.photos = photos;
                
            res.render('index', model);
        });
    else 
        res.render('index', model);
};

