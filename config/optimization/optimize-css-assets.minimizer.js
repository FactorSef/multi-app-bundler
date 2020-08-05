const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (useSourceMap = false, customConfig = {}) {
	const config = Object.assign({}, {
		cssProcessorOptions: {
			parser: safePostCssParser,
			map: useSourceMap
				? {
					inline: false,
					annotation: true,
				}
				: false,
		},
		cssProcessorPluginOptions: {
			preset: ['default', { minifyFontValues: { removeQuotes: false } }],
		},
	}, customConfig)

	return {
		optimization: {
			minimizer: [
				new OptimizeCSSAssetsPlugin(config),
			],
		}
	};
};
