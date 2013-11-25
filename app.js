var express = require('express');
var routes = require('./routes'),
    user = require('./routes/user'),
    api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var users = [ 
    { 'name': 'sb1', email: 'sb1@gmail.com', id: 1 },
    { 'name': 'sb2', email: 'sb2@gmail.com', id: 2 },
    { 'name': 'sb3', email: 'sb3@gmail.com', id: 3 },
    { 'name': 'sb4', email: 'sb4@gmail.com', id: 4 },
    { 'name': 'sb5', email: 'sb5@gmail.com', id: 5 },
];

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list, { users: users });
app.get('/users/edit/:id', user.edit);
app.get('/api/edit', api.edit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
