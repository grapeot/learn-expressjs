var express = require('express');
var http = require('http');
var path = require('path');
var sys = require('sys')
var cp = require('child_process'),
    spawn = cp.spawn,
    exec = cp.exec;
var child;

var app = express();

// all environments
app.set('port', process.env.PORT || 3011);
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

app.post('/', function(req, res) {
    spawn('git', ['pull']);   // git pull
    child.kill();
    startApp();
    res.send('ok.');
});

function startApp()
{
    child = spawn('node', ['app.js']);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        var str = data.toString()
        console.log(str);
    });
    child.on('close', function (code) {
        console.log('process exit code ' + code);
    });
}

startApp();
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
