var triggerApp = angular.module('triggerApp', []);
 
triggerApp.controller('TriggerController', function ($scope) {

  var switches = $scope.switches = [];
  for (var i = 0; i < 26; i++) {
  	switches.push({
			index: i,
  		label: String.fromCharCode(i + 65)
  	});
  }

  $scope.rfidCode = "123456";

  var results = $scope.results = [{text:"Initialised."}];

  var socket = io.connect('http://localhost');
  socket.on('init', function (data) {
    results.push({ text: "socket.io initialised"});
    $scope.$apply();
  });

  socket.on('authn', function (isGenuine, id) {
    results.push({ text: "Server authn" + (isGenuine === true ? "" : " (fake)") + ": " + id});
    $scope.$apply();
  });

  $scope.triggerClick = function(sw) {
  	results.push({ text: "Trigger clicked: " + sw.label });
    socket.emit('trigger', sw.label);
  };

  $scope.rfidScan = function (code) {
    results.push({ text: "Sending fake authn for id " + code });
    socket.emit('fakeAuthn', code);
  }
});