var audio = new Audio('assets/pi.ogg');

$('#task-interface').text('TRADITIONAL');

// Submenu Trigger
// ------------------------------

$('.menu-block > .menu > .menu-item').on('mouseover', function () {
	var $this = $(this);
	$this.addClass('intended');

	if ($this.prop('hoverTimeout')) {
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	}

	$this.prop('hoverTimeout', setTimeout(function() {
		$('.submenu').addClass('hidden');
		$this.children('.submenu').removeClass('hidden');
	}, 400));
});

$('.menu-block > .menu > .menu-item').on('mouseleave', function() {
	var $this = $(this);
	$this.removeClass('intended');
	$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));

	$('.submenu').addClass('hidden');
});

// Menu Selection
// ------------------------------

$('.selectable').on('mouseover', function () {
	var $this = $(this);
	$this.addClass('intended');

	if ($this.prop('hoverTimeout')) {
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	}

	$this.prop('hoverTimeout', setTimeout(function() {
		$('.selectable').removeClass('selected');
		$this.addClass('selected');
		audio.play();
		window.selected.push($this.text());
	}, 400));
});

$('.selectable').on('mouseleave', function() {
	var $this = $(this);
	$this.removeClass('intended');
	$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
});