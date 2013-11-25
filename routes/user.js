
/*
 * GET users listing.
 */

exports.list = function(req, res){ res.render('users', { 'users' : users } ); }; 
exports.edit = function(req, res) { res.render('edit', { 'users': users, id: req.params.id }); };
