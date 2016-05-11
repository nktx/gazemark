Menu = function() {
	this.mode = false;

	this.open = function() {
		this.mode = true;
		this.positionX = x;
		this.positionY = y;
		window.selected = [];
		$('#task-assignment').hide();

		$('.submenu').addClass('hidden');
		$('.menu-block')
			.css('left', x)
			.css('top', y)
			.fadeIn();
	};
	
	this.close = function() {
		this.mode = false;
		$('.menu-block').fadeOut();
		$('.selectable').removeClass('selected');
		$('#task-assignment').show();
	};
};

Record = function(x, y) {
	this.interface = $('#task-interface').text();
	this.subject = $('#task-subject').val();
	this.result = [];
	this.duration = 0;
	this.path = [];
	this.startTime = Date.now();
	this.startPosition = {
		X: x,
		Y: y
	};

	this.record = function(x, y) {
		this.path.push({
			X: x,
			Y: y
		})
	};
	
	this.end = function(r) {
		this.duration = Date.now() - this.startTime;
		this.result = r;

		$('#task-duration').text(this.duration);
		if (this.result.length >= 1) {
			$('#task-result').text(this.result[this.result.length - 1]);
		} else {
			$('#task-result').text('-');
		}

		console.log(this);
		socket.emit('record', this);
	};
};

Record = function(x, y) {
	this.interface = $('#task-interface').text();
	this.subject = $('#task-subject').val();
	this.result = [];
	this.duration = 0;
	this.path = [];
	this.startTime = Date.now();
	this.startPosition = {
		X: x,
		Y: y
	};

	this.record = function(x, y) {
		this.path.push({
			X: x,
			Y: y
		})
	};
	
	this.end = function(r) {
		this.duration = Date.now() - this.startTime;
		this.result = r;
		this.task = task.name;
		task.assign();

		$('#task-duration').text(this.duration);
		if (this.result.length >= 1) {
			$('#task-result').text(this.result[this.result.length - 1]);
		} else {
			$('#task-result').text('-');
		}

		console.log(this);
		socket.emit('record', this);
	};
};

Task = function() {
	var tasks = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'
	];
	tasks.sort(function(){return Math.round(Math.random());});
	this.name = '';
	this.lock = false;

	this.assign = function() {
		this.name = tasks.pop();
		if (this.name) {
			$('#task-assignment').text(this.name);
		} else {
			$('#task-assignment').text('')
				.addClass('none');
			this.lock = true;
		}
	};
	
	this.close = function() {
		this.name = '';
		$('#task-assignment').text('');
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
	window.selected = [];

	socket = io.connect();
	menu = new Menu();
	task = new Task();

	$(document).keydown(function(event){

		// avoid keydown event repeated
		if (event.repeat != undefined) { allowed = !event.repeat; }
	  if (!allowed) return;
	  allowed = false;
		
		if (event.keyCode == 90 && !task.lock) {
			if (recordMode){
				gestureRecord = new Record(x, y);
			}
			menu.open();
		}

    if (event.keyCode == 82) {
			recordMode = !recordMode;
			$('#record-mode').text( recordMode ? 'ON' : 'OFF');
			
			if (recordMode) {
				task.assign();
			} else {
				task.close();
			}
    }
	});

	$(document).keyup(function(event){
		allowed = true;

		if (event.keyCode == 90 && !task.lock) {
			if (recordMode){
				gestureRecord.end(window.selected);
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