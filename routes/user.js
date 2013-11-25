
/*
 * GET users listing.
 */

var data = require('../data.js');

module.exports = {
    'list': function(req, res){ res.render('users', { 'users' : data.users } ); }
};
// exports.edit = function(req, res) { res.render('edit', { 'users': users, id: req.params.id }); };
