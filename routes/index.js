var data = require('../data'),
    path = require('path'),
    cp = require('child_process'),
    folk = cp.folk,
    exec = cp.exec,
    spawn = cp.spawn;

module.exports = {
    'upload': function(req, res) {
        console.log('file uploaded: ' + req.files.file.path);
        res.redirect('/' + path.basename(req.files.file.path));
    },
    'login': function(req, res) {
        res.sendFile('/public/login.html');
    },
    'index': function(req, res){ res.render('index', { title: 'Express' }); },
    'list': function(req, res){ res.render('users', { 'users' : data.users } ); },
    'edit': function(req, res) { res.render('edit', { 'users': data.users, id: req.params.id }); },
    'cross_index': function(req, res) { res.render('cross-index'); },
    'cross_popup': function(req, res) { res.render('cross-popup'); },
    'cross_popup_hit': function (req, res) {
        data.ajaxRes.write('document.getElementById("text").innerHTML = "Logged on!";');
        data.ajaxRes.end();
        res.render('cross-popup-hit');
    },
    'cross_index_ajax': function (req, res) {
        data.ajaxRes = res;
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'no-cache',
            'Connection': 'close',
            'Pragma': 'no-cache'
        });
    }
};
