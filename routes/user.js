
/*
 * GET users listing.
 */

var data = require('../data');

module.exports = {
    'list': function(req, res){ res.render('users', { 'users' : data.users } ); },
    'edit': function(req, res) { res.render('edit', { 'users': data.users, id: req.params.id }); }
};
