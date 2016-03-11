'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import ngAnnotate from 'gulp-ng-annotate';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import path from '../paths';
const argv = util.env;

// scripts - clean dist dir then annotate, uglify, concat


gulp.task('scripts',  () => {

    return gulp.src(path.app.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulpif(argv.prod, concat(`${path.fileNames.jsBundle}.js`)))
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../js'
        }))
        .pipe(gulp.dest(path.build.dist.scripts));
});

/**
 * The 'copy' task for scripts
 *
 * @return {Stream}
 */
gulp.task('scripts-cp', () => {
    return gulp.src(`${path.tmp.scripts}**/*.js`)
        .pipe(gulp.dest(path.build.dist.scripts));
});