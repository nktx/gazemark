var marginThreshold = 85;
var submenuPositionX = 0;
var submenuPositionY = 0;
var menuOffset = 100*Math.SQRT2;

// Submenu Trigger
// ------------------------------

$('.menu-block > .menu > .menu-item').on('mouseleave', function() {
	var $this = $(this);
	var d = distance(window.x, window.y, menu.positionX, menu.positionY);

	if (d >= marginThreshold) {
		$this.addClass('intended');

		if ($this.prop('hoverTimeout')) {
			$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
		}

		$this.prop('hoverTimeout', setTimeout(function() {
			$('.submenu').addClass('hidden');
			$this.children('.submenu').removeClass('hidden');

			submenuPositionX = $this.children('.submenu').offset().left + menuOffset;
			submenuPositionY = $this.children('.submenu').offset().top + menuOffset;
		}, 500));

	}
});

$('.menu-block > .menu > .menu-item').on('mouseover', function() {
	var $this = $(this);
	var d = distance(window.x, window.y, menu.positionX, menu.positionY);

	if ((d <= marginThreshold) && !$this.hasClass('intended')) {
		$('.menu-block > .menu > .menu-item').removeClass('intended');
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));

		$('.submenu').addClass('hidden');
	}
});

// Menu Selection
// ------------------------------

$('.selectable').on('mouseleave', function () {
	var $this = $(this);
	var d = distance(window.x, window.y, submenuPositionX, submenuPositionY);

	if (d >= marginThreshold) {
		$this.addClass('intended');

		if ($this.prop('hoverTimeout')) {
			$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
		}

		$this.prop('hoverTimeout', setTimeout(function() {
			$('.selectable').removeClass('selected');
			$this.addClass('selected');
		}, 1000));
	}
});

$('.selectable').on('mouseover', function() {
	var $this = $(this);
	var d = distance(window.x, window.y, submenuPositionX, submenuPositionY);

	if (d <= marginThreshold) {
		$('.selectable').removeClass('intended');
		$this.prop('hoverTimeout', clearTimeout($this.prop('hoverTimeout')));
	}
});