var scale = 1;
var input;

var guides = true;

// render
window.render = function( i ){

	input = i;
	project.clear();
	calcAreas();

	console.log( input );

}

function calcArea( width, height, centerOrX, y, help ){

	var a = new Rectangle();
	a.width = width;
	a.height = height;
	if( y === undefined || y === false ){
		// align to center
		if( centerOrX === undefined || centerOrX === false ){
			centerOrX = view.center;
		}
		a.x = centerOrX.x - (width/2);
	  a.y = centerOrX.y - (height/2);
	} else {
		a.x = centerOrX;
	  a.y = y;
	}

	if( help !== false ){
		if( guides === true ){
			// render help
			var h = new Path.Rectangle(a);
		  h.strokeColor = 'violet';
		  h.strokeWidth = 0.5;
		}
	}

	return a;
}

function fitRectIntoRect( fitThis, intoThis ){

	if( intoThis === undefined ){
		intoThis = view.viewSize;
	}

	var ratio1 = intoThis.width / intoThis.height;
	var ratio2 = fitThis.width / fitThis.height;

	if( ratio2 >= ratio1 ){
    scale = intoThis.width / fitThis.width;
	} else {
    scale = intoThis.height / fitThis.height;
	}

	return {
		width: fitThis.width * scale,
		height: fitThis.height * scale
	};
}

/* return max area */
function areaConstraints(){

	var max = 0.85;
	if( view.viewSize.width < 700 || view.viewSize.height < 600 ){
		max = 0.9;
	}

	return calcArea( view.viewSize.width * max, view.viewSize.height * max, false, false, false );
}
function areaLogoOuter( constraints ){

	var area = fitRectIntoRect( input, constraints );
	return calcArea( area.width, area.height );
}
function areaLogoInner( logoOuter ){

	var padding = input.padding * scale;
	return calcArea( logoOuter.width - padding, logoOuter.height - padding );
}
function areaText( logoInner ){

	var width = ( logoInner.width / 4 ) * input.size;
	drawLogo();

	switch (input.text) {
		case 'atw':
			return calcArea( width, 100 );
			break;
		case 'tud':
			return calcArea( width, 100 );
			break;
		default:
			return calcArea( width, 0 );
	}

}

function calcAreas(){

	var constraints = areaConstraints();
	var logoOuter = areaLogoOuter( constraints );
	var logoInner = areaLogoInner( logoOuter );

	// var logoText = areaText( logoInner );

	drawRulers( logoInner );

	drawLogoShape( logoInner );

}




function drawLogo( filename ){
	var file;
	if( assets.hasOwnProperty(filename) ){
		file = assets[key];
	} else {
		file = assets[ Object.keys(assets)[0] ];
	}

	project.importSVG( file.url, function(item, svg) {
		item.bounds = new Rectangle(
			new Point(20, 20),
			new Size( file.width, file.height)
		);
	});

}

function translateToGrid(area,x,y){
    return new Point(
        area.x + (area.width  / 8 * x),
        area.y + (area.height * y)
    );
}
function drawRulers( area ){
	if( guides === false ){
		return;
	}

	var fourth = area.width / 4;
	for( var x = 0; x < 5; x++ ){
		var line = new Path.Line(
			new Point( area.x + (x * fourth), 0),
			new Point( area.x + (x * fourth), view.viewSize.height)
		);
		line.strokeColor = 'blue';
		line.strokeWidth = 0.5;
	}

}
function drawLogoShape( area ){

    var style = {
        strokeWidth: input.stroke,
        strokeColor: 'black',
        strokeCap: 'round',
        strokeJoin: 'round'
    };

    var A = new Path( style );
    A.add( translateToGrid(area,0,1) );
    A.add( translateToGrid(area,0,0) );
    A.add( translateToGrid(area,2,1) );
    A.closed = true;

    var T = new Path( style );
    T.add( translateToGrid(area,1,0) );
    T.add( translateToGrid(area,3,0) );
    T.add( translateToGrid(area,2,0) );
    T.add( translateToGrid(area,4,1) );

    var W = new Path( style );
    W.add( translateToGrid(area,4,0) );
    W.add( translateToGrid(area,6,1) );
    W.add( translateToGrid(area,6,0) );
    W.add( translateToGrid(area,8,1) );
    W.add( translateToGrid(area,8,0) );
    W.closed = true;
}
