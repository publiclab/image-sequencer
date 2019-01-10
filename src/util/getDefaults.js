const Brightness = require('./../modules/Brightness/info.json');
const Blur = require('./../modules/Blur/info.json');

const defaults = {
	Blur,
	Brightness
}

const getDefaults = function(module_name){
	return defaults[module_name].inputs;
}

module.exports = getDefaults;