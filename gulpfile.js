var gulp = require('gulp');

var clean = require('gulp-clean');
const less = require('gulp-less');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const tsconfig = require('./tsconfig.json');

var bases = {
 app: 'app/',
 built: 'built/',
};

var paths = {
 scripts: [bases.app+'scripts/**/*.js'],
 styles: [bases.app+'styles/**/*.{less,css}', !bases.app+'styles/css/*.css'],
 images: [bases.app+'images/**/*.{png,jpg,jpeg,gif}'],
 index: [bases.app+'index.html'],
 templates: [bases.app+'templates/*.html']
};

// Delete the built directory
gulp.task('clean', function() {
 gulp.src(bases.built+'js/**/*.js')
 .pipe(clean());
 gulp.src(bases.built+'css/**/*.css')
 .pipe(clean());
 gulp.src(bases.built+'images/**/*.{png,jpg,jpeg,gif}')
 .pipe(clean());
 gulp.src(bases.built+'index.html')
 .pipe(clean());
 gulp.src(bases.built+'templates/*.html')
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('jshint', function(){
 gulp.src(paths.scripts)
	.pipe(jshint())
 	.pipe(jshint.reporter('default'));
});
gulp.task('scripts', function() {
 gulp.src(paths.scripts)
 .pipe(concat('milieux.js'))
 .pipe(gulp.dest(bases.built + 'js/'))
 .pipe(uglify())
 .pipe(concat('milieux.min.js'))
 .pipe(gulp.dest(bases.built + 'js/'));
});
gulp.task('styles', function() {
 gulp.src(paths.styles)
 .pipe(less())
 .pipe(concat('milieux.css'))
 .pipe(gulp.dest(bases.app + '/styles/css/'))
 .pipe(gulp.dest(bases.built + 'css/'));
});
gulp.task('images', function() {
 gulp.src(paths.images)
 .pipe(imagemin())
 .pipe(gulp.dest(bases.built + 'images/'));
});
gulp.task('index', function() {
 gulp.src(paths.index)
 .pipe(gulp.dest(bases.built));
});
gulp.task('templates', function() {
 gulp.src(paths.templates)
 .pipe(gulp.dest(bases.built+'templates/'));
});
gulp.task('watchit', function() {
 gulp.watch(paths.scripts, ['scripts']);
 gulp.watch(paths.styles, ['styles']);
 gulp.watch([paths.images, !bases.app+'images/compressed/**/*.{png,jpg,jpeg,gif}'], ['images']);
 gulp.watch(paths.index, ['index']);
 gulp.watch(paths.templates, ['templates']);
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts', 'styles', 'images', 'index', 'templates']);