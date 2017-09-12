/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */

const path = require( 'path' );

const srcPath = path.join( __dirname, '/../src' );
const dfltPort = 8000;

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules()
{
    return {
        rules : [
            // {
            //     test    : /\.(js|jsx)$/,
            //     include : srcPath,
            //     enforce : 'pre',
            //     use     : [ {
            //
            //         loader  : 'eslint-loader',
            //         options : { modules: true }
            //     } ]
            // },
            {
                test : /\.jsx?$/,
                use  : 'happypack/loader?id=js'
            },
            {
                test : /\.(css|sass|scss|less|styl)$/,
                use  : ExtractTextPlugin.extract( {
                    fallback : 'style-loader',
                    loader   : [
                        'happypack/loader?id=styles'
                    ]
                } )
            },
            {
                test : /\.(png|jpg|gif)$/,
                use  : [ {

                    loader  : 'url-loader',
                    options : { limit: 8192 }
                } ]
            },
            {
                test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use  : [ {

                    loader  : 'url-loader',
                    options :
                    {
                        limit    : 8192,
                        mimetype : 'image/svg+xml'
                    }
                } ],
            },
            {
                test : /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use  : [ {

                    loader  : 'file-loader',
                    options :
                    {
                        name : 'webfonts/[name].[ext]',
                    }
                } ],
            },
            {
                test : /\.html$/,
                use  : 'raw-loader'
            },
        ],
    };
}

module.exports = {
    srcPath,
    publicPath : './',
    port       : dfltPort,
    getDefaultModules
};
