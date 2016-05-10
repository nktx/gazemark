$(function() {

	var line = d3.svg.line()
			.x(function(d) {
				return d.X;
			})
			.y(function(d) {
				return d.Y;
			})
			.interpolate('basis');

	var svg = d3.select('body')
								.append('svg')
								.attr('height', $(window).height())
								.attr('width', $(window).width())
								.attr('class', 'result-svg');

	function drawResult(result){
		result.forEach(function (data){
			
			var translatedPath = data.path.map(function(p){
				return {
					X: p.X + offsetX - data.startPosition.X,
					Y: p.Y + offsetY - data.startPosition.Y
				}
			});

			console.log(translatedPath);

			svg.append('path')
				.attr({
					'd': line(translatedPath),
					'stroke': '#333',
					'stroke-width': '1px',
					'fill': 'none'
				});
		});
	}

	var offsetX = $(window).width()/2;
	var offsetY = $(window).height()/2;

	$('.menu-block')
		.css('left', offsetX)
		.css('top', offsetY)
		.fadeIn();

	socket = io.connect();
	socket.emit('readfile');

	socket.on('filedata', function(data){
		console.log(data)
		drawResult(data);
	});

});