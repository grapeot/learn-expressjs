var data = require('../data');

module.exports = {
    'edit': function(req, res) {
        var newName = req.body.name,
            newEmail = req.body.email,
            id = req.body.id;
        data.users[id].name = newName;
        data.users[id].email = newEmail;

        res.redirect('/users');
    }
};
