menu = function(mode = false) {

	this.open = function() {
		if (!this.mode) {
			$('.menu-block')
				.css('left', x)
				.css('top', y);
		}

		this.mode = true;
		$('#menu-status').text('ON');
		$('.menu-block').fadeIn();
	};
	
	this.close = function() {
		this.mode = false;
		$('#menu-status').text('OFF');
		$('.menu-block').fadeOut();
	};
};

$(function() {

	var recordMode = false;

	socket = io.connect();
	menu = new menu();

	$(document).keydown(function(event){ 
		if (event.keyCode == 90) { 			
			menu.open();
		}

    if (event.keyCode == 82) {
			recordMode = !recordMode;
			$('#record-mode').text( recordMode ? 'ON' : 'OFF');
    }
	});

	$(document).keyup(function(event){ 
		if (event.keyCode == 90) {		
			menu.close();
		}
	});

	$(document).mousemove(function(e) {
    window.x = e.pageX;
    window.y = e.pageY;
	});

});