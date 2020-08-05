module.exports = function (include) {
	return {
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					include,
					loader: require.resolve('babel-loader'),
					options: {
						presets: ["@babel/react"],
						customize: require.resolve(
							'babel-preset-react-app/webpack-overrides'
						),
						plugins: [
							[
								require.resolve('babel-plugin-named-asset-import'),
								{
									loaderMap: {
										svg: {
											ReactComponent:
												'@svgr/webpack?-svgo,+titleProp,+ref![path]',
										},
									},
								},
							],
						],
					},
				},
			],
		},
	};
};
