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
        QRCode.draw('http://lab.grapeot.me:3010/cross/2?id=' + rand, {}, function(error, canvas){
                res.render('cross-index', { qr: canvas.toDataURL() }); 
        });
    },
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
