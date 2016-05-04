$(function() {

	socket = io.connect();

	var menuMode = false;
	var recordMode = false;

	var $menuStatus = $('#menu-status');
	var $recordMode = $('#record-mode');

	$(document).keydown(function(event){ 
		if (event.keyCode == 90) { 
			menuMode = true;
			$menuStatus.text('ON');
		}

    if (event.keyCode == 82) {
			recordMode = !recordMode;
    	$recordMode.text( recordMode ? 'ON' : 'OFF');
    }
	});

	$(document).keyup(function(event){ 
		if (event.keyCode == 90) {
			menuMode = false;
			$menuStatus.text('OFF');
		}
	});

});