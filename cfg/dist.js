const path                    = require( 'path' );

const merge                   = require( 'lodash.merge' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const UglifyJsPlugin          = require( 'uglifyjs-webpack-plugin' );

const baseConfig              = require( './base' );


/* webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production */

const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'commonjs2' },

    devtool   : 'source-map',
    externals : {
        'nessie-ui'     : 'nessie-ui',
        'prop-types'    : 'prop-types',
        'react-dom'     : 'react-dom',
        componentDriver : 'nessie-ui/dist/componentDriver',
        react           : 'react',
    },
    mode         : 'production',
    optimization : {
        minimizer : [
            new OptimizeCSSAssetsPlugin( {
                cssProcessorOptions : { map: { inline: false } },
            } ),
            new UglifyJsPlugin( {
                cache     : true,
                parallel  : true,
                sourceMap : true,
            } ),
        ],
    },
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
    entry   : path.join( __dirname, '../src/drivers.js' ),
    output  : { filename: 'driverSuite.js' },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'driverSuite.css',
        } ),
    ],
} );


module.exports = [
    addons,
    componentDriver,
    components,
    driverSuite,
];
