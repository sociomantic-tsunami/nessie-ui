const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


module.exports = merge( {}, baseConfig, {
    externals : {
        'react/addons'                   : true,
        'react/lib/ExecutionEnvironment' : true,
        'react/lib/ReactContext'         : true,
        'react-dom/test-utils'           : true,
        'react-test-renderer/shallow'    : true,
    },
    mode    : 'development',
    plugins : [ new MiniCssExtractPlugin() ],
    resolve : {
        alias : {
            'nessie-ui'     : path.join( __dirname, '../src/index' ),
            componentDriver : path.join( __dirname, '../src/Testing/index' ),
        }
    },
} );
