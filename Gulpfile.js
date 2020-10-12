const gulp = require('gulp');
const {render, serve, watch} = require('gulp-respec')({});

gulp.task('default', gulp.series(render, serve, watch));
gulp.task('render', render);