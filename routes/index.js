
/*
 * GET home page.
 */

exports.index = function(req, res){
    // rendering view "index" with data structure.
    res.render('index', { title: 'Yo Mama\'s House' });
};