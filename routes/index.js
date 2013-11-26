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
};
