const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const devConfig = merge( {}, baseConfig, {
    entry : path.join( __dirname, '../src/index.js' ),
    mode  : 'development',
} );


const devComponents = merge( {}, devConfig, {
    output : {
        filename      : 'index.dev.js',
        libraryTarget : 'umd',
    },
    externals : {
        'prop-types' : {
            commonjs  : 'prop-types',
            commonjs2 : 'prop-types',
            window    : 'PropTypes',
        },
        react : {
            commonjs  : 'react',
            commonjs2 : 'react',
            window    : 'React',
        },
        'react-dom' : {
            commonjs  : 'react-dom',
            commonjs2 : 'react-dom',
            window    : 'ReactDOM',
        },
    },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.dev.css',
        } ),
    ],
} );

const deprecatedDisplayComponents = merge( {}, devConfig, {
    output : {
        filename      : 'displayComponents.js',
        library       : 'DisplayComponents',
        libraryTarget : 'window',
    },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'displayComponentStyles.css',
        } ),
    ],
} );


module.exports = [
    devComponents,
    deprecatedDisplayComponents,
];
