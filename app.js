var express = require('express'),
    routes = require('./routes'),
    coffee = require('./routes/coffee'),
    api = require('./routes/api'),
    _data = require('./routes/data'),
    http = require('http'),
    path = require('path'),
    sys = require('sys'),
    redis = require('redis'),
    rclient = redis.createClient(),
    _ = require('underscore');

var app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

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
app.get('/cross', routes.cross_index);
app.get('/cross/popup', routes.cross_popup);
app.get('/cross/popup_hit', routes.cross_popup_hit);
app.get('/cross/ajax', routes.cross_index_ajax);
app.get('/gist/', routes.gist_new);
app.get('/gist/id/:id', routes.gist_get);
app.get('/gist/create', routes.gist_create);
app.get('/chat/', routes.chat);

// initialize socket.io
_data.chat_num = 0;
io.sockets.on('connection', function(sock) {
    console.log('Connected.');
    _data.chat_num++;
    sock.id = _data.chat_num;
    if (_data.socks == undefined) {
        _data.socks = [];
    }
    _data.socks.push(sock);
    console.log('Socket connected. Assigned id #' + sock.id + '.');

    sock.broadcast.emit('num', { num: sock.id });
    sock.broadcast.emit('send', { user: 'System', message: 'A new user enters the chatroom.' });
    sock.on('send', function(data) {
        console.log(data);
        data.user = 'Anonymous' + sock.id;
        sock.broadcast.emit('send', data);
    });
    sock.on('disconnect', function() {
        console.log('Socket #' + sock.id + ' Disconnected.');
        _data.chat_num--;
        sock.broadcast.emit('send', { user: 'System', message: 'A user leaves the chatroom.' });
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
