const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'commonjs2' },

    devtool   : 'source-map',
    externals : {
        componentDriver : 'nessie-ui/dist/componentDriver',
        'nessie-ui'     : 'nessie-ui',
        'prop-types'    : 'prop-types',
        react           : 'react',
        'react-dom'     : 'react-dom',
    },
    mode : 'production',
} );


const addons = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/addons.js' ),
    output : { filename: 'addons.js' },

    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            fallback  : 'css-loader',
            filename  : 'addons.css',
        } ),
    ],
} );

const displayComponents = merge( {}, distConfig, {
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
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'displayComponentStyles.css',
        } ),
    ],
} );

const components = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/index.js' ),
    output : { filename: 'index.js' },

    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.css',
        } ),
    ],
} );

const componentDriver = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/Testing/index.js' ),
    output : { filename: 'componentDriver.js' },
} );

const driverSuite = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/drivers.js' ),
    output : { filename: 'driverSuite.js' },
} );


module.exports = [
    addons,
    components,
    componentDriver,
    displayComponents,
    driverSuite,
];
