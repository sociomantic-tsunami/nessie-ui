const path                 = require( 'path' );

const { merge }            = require( 'lodash' );

const baseConfig           = require( './base' );


const devConfig = merge( {}, baseConfig, {
    entry  : path.join( __dirname, '../src/index.js' ),
    output : {
        filename      : 'index.dev.js',
        library       : 'Nessie',
        libraryTarget : 'window',
    },
    externals : {
        'prop-types' : 'PropTypes',
        react        : 'React',
    },
    mode    : 'development',
    plugins : [],
} );

devConfig.module.rules[ 1 ].use[ 0 ] = 'style-loader';

module.exports = devConfig;
