var express = require('express');
var routes = require('./routes'),
    coffee = require('./routes/coffee'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    sys = require('sys');
var child;

var app = express();

// all environments
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.bodyParser({ keepExtensions: true, uploadDir: "public" }))
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// set up the routes
app.get('/', routes.index);
app.get('/users', routes.list);
app.get('/users/edit/:id', routes.edit);
app.post('/api/edit', api.edit);
app.post('/upload', routes.upload);
app.get('/coffee', coffee.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
