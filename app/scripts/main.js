menu = function(mode = false) {

	this.open = function() {
		if (!this.mode) {

			this.positionX = x;
			this.positionY = y;

			$('.submenu').addClass('hidden');
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

		$('.selectable').removeClass('selected');
	};
};

function distance(p1x, p1y, p2x, p2y) {
	var dx = p2x - p1x;
	var dy = p2y - p1y;
	return Math.sqrt(dx * dx + dy * dy);
}

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