
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes'); // ./routes/index.js
var test = require('./routes/test');
var TriggersPage = require('./routes/triggers');
var events = require('events');

var http = require('http');
var path = require('path');

var app = express();

var server = http.createServer(app),
	io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 5678);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    console.log('CAUTION: Express configured for development environment!');
    app.use(express.errorHandler());
}

// TODO: replace this with the EventEmiter from rfidvendo
var authnEmitter = new events.EventEmitter();

var triggersPage = new TriggersPage(io.sockets, authnEmitter);

app.get('/', routes.index);
app.get('/test', test.route);
app.get('/triggers', triggersPage.view);

app.set('title', 'Express Test App');

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
