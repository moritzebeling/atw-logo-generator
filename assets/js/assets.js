/* assets */
let assets = {
	atw: {
		url: 'assets/logo/atw-1.svg',
		title: 'ATW 1',
		width: 971,
		height: 43,
	},
	atw2: {
		url: 'assets/logo/atw-2.svg',
		title: 'ATW 2',
		width: 475,
		height: 101,
	},
	atwtud: {
		url: 'assets/logo/atw-tud.svg',
		title: 'ATW+TUD',
		width: 971,
		height: 102,
	},
	/*
	tud: {
		url: 'assets/logo/tud.svg',
		title: 'Logo TUD',
		width: 655,
		height: 263,
	},
	*/
};

function getAsset( id ){

	switch (id) {
		case undefined:
		case false:
		case 'false':
		case 0:
			return false
			break;
	}

	if( assets.hasOwnProperty( id ) ){
		return assets[id];
	}

	return false;
}
