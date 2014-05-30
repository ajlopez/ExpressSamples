
/**
 * Module dependencies.
 */

var express = require('express')
  , engine = require('ejs-locals')
  , http = require('http')
  , path = require('path');

var app = express();

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
//app.use(app.router);
app.use(express.static('d:\\Software\\apache-tomcat-7.0.47\\webapps\\docs'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
