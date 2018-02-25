const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
process.env.NODE_ENV = 'development';

console.log('Generating minified bundle for production via webpack. This will take moment.');

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(err.bold.red);
        return 1;
    }
    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(console.log);
    }
    if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following errors:'.bold.yellow);
        return jsonStats.warnings.map(console.log);
    }

    console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true,
    }));
    console.log('App is ready for development');
    return true;
});
