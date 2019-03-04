const path                 = require( 'path' );

const { merge }            = require( 'lodash' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin       = require( 'uglifyjs-webpack-plugin' );

const baseConfig           = require( './base' );


/* webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production */

const distConfig = merge( {}, baseConfig, {
    output : { libraryTarget: 'umd' },

    devtool   : 'source-map',
    externals : {
        'feather-icons' : {
            commonjs  : 'feather-icons',
            commonjs2 : 'feather-icons',
            window    : 'FeatherIcons',
        },
        'nessie-ui' : {
            commonjs  : 'nessie-ui',
            commonjs2 : 'nessie-ui',
            window    : 'Nessie',
        },
        'prop-types' : {
            commonjs  : 'prop-types',
            commonjs2 : 'prop-types',
            window    : 'PropTypes',
        },
        'react-popper' : {
            'commonjs'  : 'react-popper',
            'commonjs2' : 'react-popper',
            'window'    : 'ReactPopper',
        },
        lodash : {
            'commonjs'  : 'lodash',
            'commonjs2' : 'lodash',
            'window'    : '_',
        },
        moment : {
            'commonjs'  : 'moment',
            'commonjs2' : 'moment',
            'window'    : 'moment',
        },
        react : {
            commonjs  : 'react',
            commonjs2 : 'react',
            window    : 'React',
        },
    },
    mode         : 'production',
    optimization : {
        minimizer : [
            new UglifyJsPlugin( {
                cache     : true,
                parallel  : true,
                sourceMap : true,
            } ),
        ],
    },
} );

const components = merge( {}, distConfig, {
    entry   : path.join( __dirname, '../src/index.js' ),
    output  : { filename: 'index.js' },
    plugins : [],
} );
components.module.rules[ 1 ].use[ 0 ] = {
    loader  : 'style-loader',
    options : {
        insertAt : 'top',
    },
};

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


module.exports = [
    components,
    componentsJS,
];
