const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


module.exports = merge( {}, baseConfig, {
    entry  : path.join( __dirname, '../src/index.js' ),
    output : {
        filename      : 'displayComponents.js',
        library       : 'DisplayComponents',
        libraryTarget : 'window'
    },

    externals : {
        'prop-types' : 'PropTypes',
        react        : 'React',
        'react-dom'  : 'ReactDOM',
    },
    mode    : 'development',
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'displayComponentStyles.css',
        } ),
    ],
} );
