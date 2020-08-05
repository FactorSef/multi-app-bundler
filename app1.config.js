const merge = require('webpack-merge');
const { resolvePath } = require('./config/paths');

const baseConfig = require('./config/webpack.config');

const reactModule = require('./config/modules/react.module');
const htmlPlugin = require('./config/plugins/html.plugin');

const mainPath = 'app1';
const outputDir = resolvePath('dist/'.concat(mainPath));

module.exports = function (env, argv) {
	console.log('Select \''.concat(mainPath).concat('\' config'));

	isProduction = argv.mode === 'production'

	const config = {
		isProduction,
		useSourceMap: true,
		entries: [
			resolvePath(`${mainPath}/index.js`)
		],
		output: {
			path: outputDir,
			filename: isProduction
				? 'js/[name].[contenthash:8].js'
				: 'js/bundle.js',
			publicPath: './',
		},
		resolve: {
			extensions: ['.js', 'jsx'],
			modules: [
				'node_modules',
			],
		}
	}

	return merge([
		baseConfig(config),
		reactModule(resolvePath(mainPath)),
		htmlPlugin({
			inject: true,
			template: resolvePath('public/index.html'),
		})
	]);
}

module.exports.gulp = {
	entry: resolvePath(`${mainPath}/index.js`),
	output: outputDir,
};
