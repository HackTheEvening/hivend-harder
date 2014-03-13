
/*
 * GET triggers page.
 */

//var rfidEventEmitter = require('../rfidvendo');

/// CTOR
/// sockets [socket.io]: required
/// authnEmitter [EventEmitter]: required. Can be the RFID authenticator or
///								 any EventEmitter which emits an 'authn' event.
module.exports = function TriggersPage(sockets, authnEmitter) {
	var Sockets = sockets;
	var self = this;

	this.view = function(req, res) {
	    res.render('triggers', { fakeAuthnWarning: (!authnEmitter.IS_RFID) });
	};

	sockets.on('connection', function (socket) {
	  	socket.emit('init', { hello: 'world' });

	  	socket.on('trigger', function (data) {
	    	console.log('trigger fired: ' + JSON.stringify(data));
	  	});

	  	socket.on('fakeAuthn', function onFakeAuthn(id) {
	  		console.log('Fake authentication from Triggers page: ' + id);
	  		authnEmitter.emit('authn', false, id);
	  	});

	  	authnEmitter.on('authn', function onAuthn(isGenuine, id) {
	  		socket.emit('authn', isGenuine, id);
	  	});

		/*rfidEventEmitter.on('id recieved', function(id) {
			socket.emit('auth', id);
		});*/
	});
}