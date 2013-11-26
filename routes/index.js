var data = require('../data'),
    path = require('path'),
    cp = require('child_process'),
    exec = cp.exec,
    spawn = cp.spawn;

module.exports = {
    'upload': function(req, res) {
        console.log('file uploaded: ' + req.files.file.path);
        res.redirect('/' + path.basename(req.files.file.path));
    },
    'index': function(req, res){ res.render('index', { title: 'Express' }); },
    'list': function(req, res){ res.render('users', { 'users' : data.users } ); },
    'edit': function(req, res) { res.render('edit', { 'users': data.users, id: req.params.id }); },
};
