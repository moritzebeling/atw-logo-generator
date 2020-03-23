/* global vars */
let fields, buttons, presetsSelect;
let original = presets[0];
let design = {};

/* setup */
function setup(){

	// create preset select field
	presetsSelect = document.getElementById('presets');
	for (let preset of presets ) {
		selectAddOption(presetsSelect, preset.id, preset.title);
	}
	selectAddOption(presetsSelect, false, 'Custom', true);
	presetsSelect.addEventListener("change", () => {
		selectPreset( presetsSelect.value );
	}, false);

	// add events to fields
	fields = document.querySelectorAll('.field');
	for(let field of fields ){
		field.placeholder = original[field.id];
		field.addEventListener("change", changeInput, false);
	}

	// add events to buttons
	buttons = document.querySelectorAll('button');
	for(let button of buttons ){
		switch (button.id) {
			case 'download':
				button.addEventListener("click", download, false);
				break;
		}
	}

	selectPreset();
}
window.onload = function() {
	setup();
}
window.addEventListener("resize", ()=>{
	window.render( design );
});

/* preset */
function selectPreset( select = 'original' ){

	// take original as current style
	design = Object.assign( design, original );

	// override only defined preset definitions
	for (let preset of presets) {
		if( preset.id === select ){
			for (let prop in preset) {
				design[prop] = preset[prop];
			}
		}
	}

	// set fields according to preset
	for(let field of fields){
		field.value = design[field.id];
	}

	render( design );
}

/* update input */
function changeInput(event){

	let target = event.srcElement;
	if( target.type === 'number' || target.dataset.parse === 'number' ){
		design[target.id] = parseFloat(target.value);
	} else {
		design[target.id] = target.value || original[target.id];
	}

	presetsSelect.value = checkMatchPreset();

	window.render( design );
}

/* check if design matches preset */
function checkMatchPreset(){
	for (let preset of presets) {
		let m = true;
		for (let prop in preset.specs) {
			if( design[prop] !== preset[prop] ){
				m = false;
			}
		}
		if( m === true ){
			return preset.id;
		}
	}
	return false;
}

/* export */
function download(){
	console.log('download svg');
}
