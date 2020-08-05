const defaultOptions = {
	limit: 10000,
	name: 'static/media/[name].[hash:8].[ext]',
}

module.exports = function (options = defaultOptions) {
	return {
		module: {
			rules: [
				{
					test: /\.(png|jpg|gif)$/,
					loader: require.resolve('url-loader'),
					options,
				},
			],
		},
	};
};
