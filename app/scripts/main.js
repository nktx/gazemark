Menu = function() {
	this.mode = false;

	this.open = function() {
		this.mode = true;
		this.positionX = x;
		this.positionY = y;

		$('#menu-status').text('ON');
		$('.submenu').addClass('hidden');
		$('.menu-block')
			.css('left', x)
			.css('top', y)
			.fadeIn();
	};
	
	this.close = function() {
		this.mode = false;
		$('#menu-status').text('OFF');
		$('.menu-block').fadeOut();
		$('.selectable').removeClass('selected');
	};
};

Record = function() {
	this.path = [];
	this.duration = 0;
	this.result = '';
	this.startTime = Date.now();

	this.record = function(x, y) {
		this.path.push({
			X: x,
			Y: y
		})
	};
	
	this.end = function(r) {
		this.duration = Date.now() - this.startTime;
		this.result = r;
	};
};

function distance(p1x, p1y, p2x, p2y) {
	var dx = p2x - p1x;
	var dy = p2y - p1y;
	return Math.sqrt(dx * dx + dy * dy);
}

$(function() {

	var allowed = true;
	var recordMode = false;
	var gestureRecord;

	socket = io.connect();
	menu = new Menu();

	$(document).keydown(function(event){

		// avoid keydown event repeated
		if (event.repeat != undefined) { allowed = !event.repeat; }
	  if (!allowed) return;
	  allowed = false;
		
		if (event.keyCode == 90) {
			if (recordMode){
				gestureRecord = new Record();
			}
			menu.open();
		}

    if (event.keyCode == 82) {
			recordMode = !recordMode;
			$('#record-mode').text( recordMode ? 'ON' : 'OFF');
    }
	});

	$(document).keyup(function(event){
		allowed = true;

		if (event.keyCode == 90) {
			if (recordMode){
				gestureRecord.end($('.selected').text());
				console.log(gestureRecord);
	    }
			menu.close();
		}
	});

	$(document).mousemove(function(e) {
    window.x = e.pageX;
    window.y = e.pageY;

    if (recordMode && menu.mode){
			gestureRecord.record(window.x, window.y);
    }
	});

});