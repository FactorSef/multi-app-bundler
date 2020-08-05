const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolvePath } = require('../paths');

const defaultConfig = {
	inject: true,
	template: resolvePath('public/index.html'),
}

module.exports = function (config = defaultConfig) {
	return {
		plugins: [
			new HtmlWebpackPlugin(config),
		]
	};
};
