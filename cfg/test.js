const path                 = require( 'path' );

const merge                = require( 'lodash.merge' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const baseConfig           = require( './base' );


module.exports = merge( {}, baseConfig, {
    mode    : 'development',
    plugins : [ new MiniCssExtractPlugin() ],
    resolve : {
        alias : {
            'nessie-ui'     : path.join( __dirname, '../src/index' ),
            componentDriver : path.join( __dirname, '../src/Testing/index' ),
        }
    },
} );
