const path                    = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'umd' },

    devtool   : 'source-map',
    externals : {
        componentDriver : 'nessie-ui/dist/componentDriver',
        'nessie-ui'     : 'nessie-ui',
        'prop-types'    : {
            window    : 'PropTypes',
            root      : 'PropTypes',
            commonjs2 : 'prop-types',
            commonjs  : 'prop-types',
            amd       : 'prop-types'
        },
        react : {
            window    : 'React',
            root      : 'React',
            commonjs2 : 'react',
            commonjs  : 'react',
            amd       : 'react'
        },
        'react-dom' : {
            window    : 'ReactDOM',
            root      : 'ReactDOM',
            commonjs2 : 'react-dom',
            commonjs  : 'react-dom',
            amd       : 'react-dom'
        }
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


module.exports = [ addons, components, componentDriver, driverSuite ];
