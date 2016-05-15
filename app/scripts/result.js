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

		var errorTaskNum = 0;
		var durationSum = 0;
		var selectionSum = 0;
		var taskNum = 0;

		result.forEach(function (data){
			if (data.subject == '') {

				var translatedPath = data.path.map(function(p){
					return {
						X: p.X + offsetX - data.startPosition.X,
						Y: p.Y + offsetY - data.startPosition.Y
					}
				});

				if ((data.result.length >= 1) && (data.result.slice(-1)[0] == data.task)) {

					taskNum++;
					durationSum += data.duration;
					selectionSum += data.result.length;

					svg.append('path')
					.attr({
						'd': line(translatedPath),
						'stroke': '#34495e',
						'stroke-width': '1px',
						'fill': 'none'
					});
				} else {
					console.log(data);
					errorTaskNum++;

					svg.append('path')
					.attr({
						'd': line(translatedPath),
						'stroke': '#e74c3c',
						'stroke-width': '1px',
						'fill': 'none'
					});
				}				
			}
		});
		
		console.log("task num: " + taskNum);
		console.log("error rate (%): " + errorTaskNum*100/taskNum);
		console.log("mean completion time (ms): " + durationSum/taskNum);
		console.log("mean selections (/task): " + selectionSum/taskNum);
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