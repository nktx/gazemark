// Submenu Trigger
// ------------------------------

$('.menu-block > .menu > .menu-item').on('mouseover', function () {
	var $this = $(this);

	if ($this.prop('hoverTimeout')) {
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	}

	$this.prop('hoverTimeout', setTimeout(function() {
		$('.submenu').addClass('hidden');
		$this.children('.submenu').removeClass('hidden');
	}, 500));
});

$('.menu-block > .menu > .menu-item').on('mouseleave', function() {
	var $this = $(this);
	$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));

	$('.submenu').addClass('hidden');
});

// Menu Selection
// ------------------------------

$('.selectable').on('mouseover', function () {
	var $this = $(this);

	if ($this.prop('hoverTimeout')) {
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	}

	$this.prop('hoverTimeout', setTimeout(function() {
		$('.selectable').removeClass('selected');
		$this.addClass('selected');
	}, 1000));
});

$('.selectable').on('mouseleave', function() {
	var $this = $(this);
	$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
});