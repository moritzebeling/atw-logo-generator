var scale = 1;
var input;

var settings = {
	showRulers: false,
	showAreas: true,
};

// render
window.render = function( i ){

	input = i;

	console.log( input );

	project.clear();
	calcAreas();

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

	if( help !== false && height > 0 ){
		showArea( a );
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
	return calcArea( logoOuter.width - padding, logoOuter.height - padding, false, false, false );
}
function areaText( logoInner ){

	var width = ( logoInner.width / 4 ) * input.size;
	var height = 0;

	var asset = getAsset( input.text );
	if( asset ){
		asset.scale = width / asset.width;
		height = asset.height * asset.scale;
	}

	var y = logoInner.y + logoInner.height - height;
	var area = calcArea( width, height, logoInner.x, y );

	if( input.text ){
		asset.width *= asset.scale;
		asset.height *= asset.scale;
		drawLogo( asset, area.x, area.y );
	}

	return area;
}
function areaShape( logoInner, logoText ){
	var padding = 0;
	if( getAsset(input.text) ){
		padding = input.padding * scale * 0.5;
	}
	var height = logoInner.height - logoText.height - padding;
	return calcArea( logoInner.width, height, logoInner.x, logoInner.y );
}

function calcAreas(){

	var constraints = areaConstraints();
	var logoOuter = areaLogoOuter( constraints );
	var logoInner = areaLogoInner( logoOuter );

	var logoText = areaText( logoInner );
	var logoShape = areaShape( logoInner, logoText );

	drawRulers( logoInner );

	// drawLogo();
	drawLogoShape( logoShape );

}




function drawLogo( asset, x, y ){
	if( x === undefined ){
		x = 20;
	}
	if( y === undefined ){
		y = 20;
	}
	project.importSVG( asset.url, function(item, svg) {
		item.bounds = new Rectangle(
			new Point(x, y),
			new Size( asset.width, asset.height)
		);
	});

}

function translateToGrid(area,x,y){
    return new Point(
        area.x + (area.width  / 8 * x),
        area.y + (area.height * y)
    );
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

/* help */
function showArea( area ){
	if( settings.showAreas !== true ){
		return false;
	}
	var a = new Path.Rectangle( area );
	a.strokeColor = 'violet';
	a.strokeWidth = 0.5;
}
function drawRulers( area ){
	if( settings.showRulers !== true ){
		return false;
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
