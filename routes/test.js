
/*
 * GET users listing.
 */

exports.route = function(req, res){
    debugger;
    res.render('testview', { foo: req.query['foo'] });
};