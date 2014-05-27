( function ( $ ) {
	// Timer
	var timer = new Date();

	// Create canvas and context
	var canvas = document.createElement( "canvas" );
	var ctx = canvas.getContext( "2d" );

	// Circles
	var circles = {
		top: {
			alphaTable: [],
			color: "",
			colorData: {
				r: 0,
				g: 0,
				b: 0
			},
			currentRotation: 0,
			direction: 1,
			gradientRange: [ 0.05, 0.8 ],
			lineWidth: 10,
			radius: 1,
			rotation: 0,
			rotationRate: 6,
			smoothing: 1 + Number.MIN_VALUE,
			steps: 64,
			x: 50,
			y: 50
		},
		bottom: {
			alphaTable: [],
			color: "",
			colorData: {
				r: 0,
				g: 0,
				b: 0
			},
			currentRotation: 0,
			direction: -1,
			gradientRange: [ 0, 1 ],
			lineWidth: 10,
			radius: 1,
			rotation: 0,
			rotationRate: 5,
			smoothing: 1 + Number.MIN_VALUE,
			steps: 64,
			x: 50,
			y: 50
		}
	}

	$.fn.ajaxLoader = function ( options ) {
		var settings = $.extend( {
			size: 30,
			lineWidth: 4,
			top: {
				color: "rgb(233, 233, 233)",
				direction: 1,
				gradientRange: [0.05, 0.8],
				rotationRate: 4,
				steps: 64
			},
			bottom: {
				color: "rgb(233, 233, 233)",
				direction: -1,
				gradientRange: [0, 1],
				rotationRate: 4,
				steps: 64
			}
		}, options );

		// Sanitize color values
		settings.top.color = $( document.createElement( "div" ) ).css( "color", settings.top.color ).css( "color" );
		var col = settings.top.color.match( /(?:(?:rgb\()\s*(\d*\.?\d*%?)\s*,\s*(\d*\.?\d*%?)\s*,\s*(\d*\.?\d*%?)\s*\))/i );
		circles.top.colorData.r = col[1];
		circles.top.colorData.g = col[2];
		circles.top.colorData.b = col[3];

		settings.bottom.color = $( document.createElement( "div" ) ).css( "color", settings.bottom.color ).css( "color" );
		col = settings.bottom.color.match( /(?:(?:rgb\()\s*(\d*\.?\d*%?)\s*,\s*(\d*\.?\d*%?)\s*,\s*(\d*\.?\d*%?)\s*\))/i );
		circles.bottom.colorData.r = col[1];
		circles.bottom.colorData.g = col[2];
		circles.bottom.colorData.b = col[3];

		if ( this.width() == 0 ) this.width( settings.size );
		if ( this.height() == 0 ) this.height( settings.size );

		circles.top.radius = circles.bottom.radius = ( options && options.size )
			? ( ( settings.size - settings.lineWidth ) / 2 ) - 2
			: ( this.width() < this.height() )
				? ( ( this.width() - settings.lineWidth ) / 2 ) - 2
				: ( ( this.height() - settings.lineWidth ) / 2 ) - 2;
		circles.top.radius = ( circles.top.radius < 1 ) ? 1 : circles.top.radius;
		circles.bottom.radius = ( circles.bottom.radius < 1 ) ? 1 : circles.bottom.radius;
		circles.top.lineWidth = circles.bottom.lineWidth = settings.lineWidth;
		circles.top.x = circles.bottom.x = this.width() / 2;
		circles.top.y = circles.bottom.y = this.height() / 2;

		this.prepend( canvas );
		// $( canvas ).css( "background", "green" );

		canvas.width = ( options && options.size ) ? options.size : this.width();
		canvas.height = ( options && options.size ) ? options.size : this.height();

		// Build gradient lookup tables
		// TODO: The gradient range is one step short of being exact
		for ( c in circles ) {
			for ( var j = 0; j <= circles[c].steps; j++ ) {
				circles[c].alphaTable.push( ( j / circles[c].steps ) * ( circles[c].gradientRange[1] - circles[c].gradientRange[0] ) + circles[c].gradientRange[0] );
			}
		}

		animate()

		return this;
	};

	function animate () {
		// update time
		var d = new Date();
		var deltaTime = ( d.getTime() - timer ) / 1000;
		timer = d;

		// rotate circles
		circles.top.currentRotation += circles.top.rotationRate * deltaTime;
		circles.bottom.currentRotation += circles.bottom.rotationRate * deltaTime;
		circles.top.currentRotation %= 2 * Math.PI;
		circles.bottom.currentRotation %= 2 * Math.PI;

		render();
		requestAnimationFrame( function () {
			animate();
		} );
	}

	function render () {
		// clear canvas
		canvas.width = canvas.width;

		for ( c in circles ) {
			ctx.lineWidth = circles[c].lineWidth;
			for ( var i = 0; i < circles[c].steps; i++ ) {
				ctx.beginPath();
				ctx.strokeStyle = 'rgba(' + circles[c].colorData.r + ',' + circles[c].colorData.g + ',' +circles[c].colorData.b + ',' + circles[c].alphaTable[i] + ')';
				var arc = circles[c].direction * ( ( i / circles[c].steps ) * 2 * Math.PI + circles[c].currentRotation );
				var arcEnd = arc + ( ( 1 / circles[c].steps ) * 2 * Math.PI );
				ctx.arc( circles[c].x, circles[c].y, circles[c].radius, arc, arcEnd );
				ctx.stroke();
			}
		}
	}
} ( jQuery ) );
