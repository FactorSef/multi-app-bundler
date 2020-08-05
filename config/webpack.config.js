const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

const variables = require('./config-variables');

module.exports = function (config) {
	const mode = variables.getMode(config.isProduction);

	console.log(`Start build for ${mode}`);

	return {
		mode,
		bail: config.isProduction, // Останавливает сборку после первой ошибки
		devtool: variables.getDevtool(config.isProduction, config.useSourceMap),
		entry: config.entries.filter(Boolean),
		output: config.output,
		resolve: config.resolve,
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						config.isProduction ? MiniCssExtractPlugin.loader : require.resolve('style-loader'),
						{
							loader: require.resolve('css-loader'),
							options: {
								importLoaders: 3,
								sourceMap: config.isProduction && config.useSourceMap,
							},
						},
						{
							loader: require.resolve('postcss-loader'),
							options: {
								ident: 'postcss',
								plugins: () => [
									require('postcss-flexbugs-fixes'),
									require('postcss-preset-env')({
										autoprefixer: {
											flexbox: 'no-2009',
										},
										stage: 3,
									}),
									postcssNormalize(),
								],
								sourceMap: config.isProduction && config.useSourceMap,
							},
						},
						{
							loader: require.resolve('resolve-url-loader'),
							options: {
								sourceMap: config.isProduction && config.useSourceMap,
							},
						},
						{
							loader: require.resolve('sass-loader'),
							options: {
								sourceMap: true,
							},
						}
					],
					// Don't consider CSS imports dead code even if the
					// containing package claims to have no side effects.
					// Remove this when webpack adds a warning or an error for this.
					// See https://github.com/webpack/webpack/issues/6571
					// sideEffects: true,
				},
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].chunk.css',
			}),
		],
		optimization: {
			minimize: config.isProduction,
			splitChunks: {
				chunks: 'all',
				name: false,
			},
		}
	};
}
