import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import webpack from 'webpack';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import ghPages from 'gulp-gh-pages';
import browserSync from 'browser-sync';
let bs = browserSync.create();

gulp.task('styles', () => {
    return gulp.src('./src/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname)]
        }))
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', (callback) => {
    webpack({
        context: __dirname,
        entry: {
            app: './src/index.es6',
            vendor: [
                './bower_components/jquery/dist/jquery.min',
                './bower_components/Snap.svg/dist/snap.svg-min',
                './bower_components/bezier-easing/index'
            ]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                'bezier-easing': '../bower_components/bezier-easing/index.js'
            }
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js'),
            new BowerWebpackPlugin({
                modulesDirectories: ['bower_components'],
                manifestFiles: ['bower.json', '.bower.json'],
                includes: /.*/,
                excludes: []
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.es6?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: require.resolve('./bower_components/Snap.svg/dist/snap.svg-min.js'),
                    loader: 'imports-loader?this=>window,fix=>module.exports=0'
                }
            ]
        }
    }, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('serve', function() {
    bs.init({
        server: {
            baseDir: './dist',
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });
});

gulp.task('build', ['copy', 'scripts', 'styles']);

gulp.task('copy', ['copy:html', 'copy:assets']);

gulp.task('copy:html', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy:assets', () => {
    return gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('default', () => {
    gulp.start('build');
});

gulp.task('watch', ['build'], () => {
    gulp.start('serve');
    gulp.watch('./src/*.html', ['copy:html']);
    gulp.watch('./src/assets/**', ['copy:assets']);
    gulp.watch('./src/**/*.less', ['styles']);
    gulp.watch('./src/**/*.es6', ['scripts']);

    gulp.watch('./dist/*.html').on('change', bs.reload);
    gulp.watch('./dist/assets/**').on('change', bs.reload);
    gulp.watch('./dist/**/*.css').on('change', bs.reload);
    gulp.watch('./dist/**/*.js').on('change', bs.reload);
});

gulp.task('gh-pages', (callback) => {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
