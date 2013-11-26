var data = require('../data');

module.exports = {
    'upload': function(req, res) {
        console.log(req.files.file);
        res.send('ok.');
    },
    'index': function(req, res){
        res.render('index', { title: 'Express' });
    },
    'list': function(req, res){ res.render('users', { 'users' : data.users } ); },
    'edit': function(req, res) { res.render('edit', { 'users': data.users, id: req.params.id }); },
};
