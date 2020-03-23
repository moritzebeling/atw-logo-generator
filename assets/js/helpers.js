/* append option to select */
function selectAddOption( select, value, text, disabled = false ){
	let option = document.createElement("OPTION");
	option.value = value;
	option.innerHTML = text;
	if( disabled === true ){
		option.disabled = true;
	}
	select.appendChild( option );
}
