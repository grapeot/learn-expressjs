var express = require('express'),
    http = require('http');
var cp = require('child_process'),
    spawn = cp.spawn,
    exec = cp.exec;
var child;

var app = express();

// all environments
var port = 3011;

app.get('/', restartApp);
app.post('/', restartApp);

function restartApp(req, res)
{
    spawn('git', ['pull']);   // git pull
    child.kill();
    startApp();
    res.send('ok.');
}

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
http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});
