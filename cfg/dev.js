const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const devConfig = merge( {}, baseConfig, {
    entry : path.join( __dirname, '../src/index.js' ),


    devtool   : 'eval-source-map',
    externals : {
        'prop-types' : 'PropTypes',
        'react-dom'  : 'ReactDOM',
        react        : 'React',
    },
    mode : 'development',
} );

const addons = merge( {}, devConfig, {
    entry  : path.join( __dirname, '../src/addons.dev.js' ),
    output : { filename: 'addons.js' },

    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            fallback  : 'css-loader',
            filename  : 'addons.dev.css',
        } ),
    ],
} );

const components = merge( {}, devConfig, {
    output : {
        filename      : 'index.dev.js',
        libraryTarget : 'commonjs2',
    },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.dev.css',
        } ),
    ],
} );

const componentDriver = merge( {}, devConfig, {
    entry  : path.join( __dirname, '../src/Testing/index.js' ),
    output : { filename: 'componentDriver.dev.js' },
} );

const umdComponents = merge( {}, devConfig, {
    output : {
        filename      : 'index.umd.dev.js',
        library       : 'Nessie',
        libraryTarget : 'umd',
    },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.dev.css',
        } ),
    ],
} );

const driverSuite = merge( {}, devConfig, {
    entry  : path.join( __dirname, '../src/drivers.js' ),
    output : { filename: 'driverSuite.dev.js' },
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
    addons,
    componentDriver,
    components,
    driverSuite,
    umdComponents,
    deprecatedDisplayComponents,
];
