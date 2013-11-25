var express = require('express');
var routes = require('./routes'),
    user = require('./routes/user'),
    api = require('./routes/api');
console.log(user);
var http = require('http');
var path = require('path');

// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var app = express();

// all environments
app.set('port', process.env.PORT || 3010);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
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

app.get('/', routes.index);
// app.get('/users', function(req, res){ res.render('users'); });
app.get('/users', user.list);
app.get('/users/edit/:id', user.edit);
app.get('/bootstrap', function(req, res) {
    // executes `pwd`
    child = exec("pwd", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    res.send('ok.');
});
app.post('/api/edit', api.edit);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
