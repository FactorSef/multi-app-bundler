const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');

const app1 = require('./app1.config'),
	app2 = require('./app2.config');

function webpackHandler(err, stats) {
	if (err) console.log(err);
	else console.log('Task complete');
}

gulp.task('build', gulp.series(
	buildApp1,
	buildApp2,
))


function buildApp1() {
	return gulp.src(app1.gulp.entry)
		.pipe(gulpWebpack(app1(undefined, { mode: 'production' }), webpack, webpackHandler))
		.pipe(gulp.dest(app1.gulp.output));
};

function buildApp2() {
	return gulp.src(app2.gulp.entry)
		.pipe(gulpWebpack(app2(undefined, { mode: 'production' }), webpack, webpackHandler))
		.pipe(gulp.dest(app2.gulp.output));
};
