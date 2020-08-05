function getMode(isEnvProduction) {
	return isEnvProduction ? 'production' : 'development';
}

function getDevtool(isEnvProduction, isUseSourceMaps = true) {
	return isEnvProduction
		? isUseSourceMaps
			? 'source-map'
			: false
		: 'cheap-module-source-map';
}

module.exports = {
	getMode,
	getDevtool
};
