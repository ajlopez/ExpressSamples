
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , customers = require('./routes/customers')
  , mongorepo = require('./libs/mongorepo')
  , engine = require('ejs-locals')
  , http = require('http')
  , path = require('path');
  
var db = mongorepo.openDatabase('mycompany', 'localhost', 27017);
customers.initialize(db); 

var app = express();

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/customers', customers.index);
app.get('/customers/new', customers.create);
app.get('/about', function (req, res) { res.render('index', { title: 'About' }); });
app.get('/contact', function (req, res) { res.render('index', { title: 'Contact' }); });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
