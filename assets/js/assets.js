/* assets */
let assets = {
	atw: {
		url: 'assets/logo/atw-1-de.svg',
		title: 'ATW 1',
		width: 971,
		height: 43,
	},
	atw2: {
		url: 'assets/logo/atw-2-de.svg',
		title: 'ATW 2',
		width: 475,
		height: 101,
	},
	atwtud: {
		url: 'assets/logo/atw-tud-de.svg',
		title: 'ATW+TUD',
		width: 971,
		height: 102,
	},
	atw_en: {
		url: 'assets/logo/atw-1-en.svg',
		title: 'ATW 1 en',
		width: 1694,
		height: 106,
	},
	atw2_en: {
		url: 'assets/logo/atw-2-en.svg',
		title: 'ATW 2 en',
		width: 1026,
		height: 194,
	},
	atwtud_en: {
		url: 'assets/logo/atw-tud-en.svg',
		title: 'ATW+TUD en',
		width: 1694,
		height: 196,
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
