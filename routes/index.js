var data = require('../data'),
    path = require('path'),
    cp = require('child_process'),
    QRCode = require('qrcode'),
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
    'cross_index': function(req, res) {
        // generate qr code
        var rand = Math.floor(Math.random() * 10000);
        QRCode.draw('http://lab.grapeot.me:3010/cross/popup_hit?id=' + rand, {}, function(error, canvas){
                res.render('cross-index', { qr: canvas.toDataURL(), rand: rand }); 
        });
    },
    'cross_popup': function(req, res) { 
        var id = req.query.id;
        console.log(id);
        res.render('cross-popup', { id: id }); 
    },
    'cross_popup_hit': function (req, res) {
        var id = parseInt(req.query.id);
        if (isNaN(id)) {
            res.send('Failed.');
            return;
        }
        data.ajaxRes[id].write('document.getElementById("text").innerHTML = "Logged on!";');
        data.ajaxRes[id].end();
        res.render('cross-popup-hit');
    },
    'cross_index_ajax': function (req, res) {
        if (data.ajaxRes == undefined); data.ajaxRes = {};
        var id = parseInt(req.query.id);
        data.ajaxRes[id] = res;
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'Cache-Control': 'no-cache',
            'Connection': 'close',
            'Pragma': 'no-cache'
        });
    },

    'gist_new': function (req, res) {
    },
    'gist_get': function (req, res) {
    }
};
