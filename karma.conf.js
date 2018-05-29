module.exports = function karmaConfig( config )
{
    config.set( {
        browsers : [ 'PhantomJS' ],
        files    : [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'loadtests.js',
        ],
        frameworks    : [ 'mocha', 'sinon-chai' ],
        preprocessors : { 'loadtests.js': 'webpack' },
        webpack       : require( './cfg/test.js' ),
    } );
};
