const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'commonjs2' },

    devtool   : 'source-map',
    externals : {
        'codemirror/mode/jsx/jsx' : { commonjs2: 'codemirror/mode/jsx/jsx' },
        'componentDriver'         : {
            commonjs2 : 'nessie-ui/dist/componentDriver',
        },
        'flounder/src/core/flounder' : {
            commonjs2 : 'flounder/src/core/flounder',
        },
        'nessie-ui'  : { 'commonjs2': 'nessie-ui' },
        'prop-types' : { 'commonjs2': 'prop-types' },
        addons       : { 'commonjs2': 'nessie-ui/dist/addons' },
        codemirror   : { 'commonjs2': 'codemirror' },
        react        : { 'commonjs2': 'react' },
    },
    mode : 'production',
} );


const componentDriver = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/Testing/index.js' ),
    output : { filename: 'componentDriver.js' },
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

const driverSuite = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/drivers.js' ),
    output : { filename: 'driverSuite.js' },
} );


module.exports = [
    componentDriver,
    components,
    driverSuite,
];
