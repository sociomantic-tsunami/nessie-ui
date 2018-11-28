const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'umd' },

    devtool   : 'source-map',
    externals : {
        'codemirror/mode/jsx/jsx' : {
            commonjs  : 'codemirror/mode/jsx/jsx',
            commonjs2 : 'codemirror/mode/jsx/jsx',
        },
        'componentDriver' : {
            commonjs  : 'nessie-ui/dist/componentDriver',
            commonjs2 : 'nessie-ui/dist/componentDriver',
            'window'  : 'ComponentDriver',
        },
        'flounder/src/core/flounder' : {
            commonjs  : 'flounder/src/core/flounder',
            commonjs2 : 'flounder/src/core/flounder',
            'window'  : 'Flounder',
        },
        'nessie-ui' : {
            'commonjs'  : 'nessie-ui',
            'commonjs2' : 'nessie-ui',
            'window'    : 'Nessie',
        },
        'prop-types' : {
            'commonjs'  : 'prop-types',
            'commonjs2' : 'prop-types',
            'window'    : 'PropTypes',
        },
        addons : {
            'commonjs'  : 'nessie-ui/dist/addons',
            'commonjs2' : 'nessie-ui/dist/addons',
        },
        codemirror : {
            'commonjs'  : 'codemirror',
            'commonjs2' : 'codemirror',
            'window'    : 'CodeMirror',
        },
        react : {
            'commonjs'  : 'react',
            'commonjs2' : 'react',
            'window'    : 'React',
        },
    },
    mode : 'production',
} );

const components = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/index.js' ),
    plugins : [],
} );
components.module.rules[ 1 ].use[ 0 ] = 'style-loader';

const componentDriver = merge( {}, distConfig, {
    entry  : path.join( __dirname, '../src/Testing/index.js' ),
    output : { filename: 'componentDriver.js' },
} );

const componentsJS = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/index.js' ),
    output  : { filename: 'componentsJS.js' },
    plugins : [
        new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.css',
        } ),
    ],
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
    componentDriver,
    components,
    componentsJS,
    driverSuite,
];
