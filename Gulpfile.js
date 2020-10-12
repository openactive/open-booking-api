const gulp = require('gulp');
const {render, serve, watch, renderOrFail} = require('gulp-respec')({});

// For use in development
gulp.task('default', gulp.series(render, serve, watch));

// For use by CI
gulp.task('render', renderOrFail);
