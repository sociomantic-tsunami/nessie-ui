const path    = require( 'path' );

const webpack = require( 'webpack' );

const defaultSettings = require( './defaults' );

const additionalPaths = [];

module.exports = {
    devtool : 'eval',

    devServer : {
        contentBase        : './src/',
        historyApiFallback : true,
        hot                : false,
        inline             : false,
        port               : defaultSettings.port,
        publicPath         : defaultSettings.publicPath,
        noInfo             : false
    },

    resolve : {

        extensions : [
            '.js',
            '.jsx'
        ],

        alias : {
            fonts  : `${defaultSettings.srcPath}/proto/webfonts/`,
            config :
            `${defaultSettings.srcPath}/config/${process.env.REACT_WEBPACK_ENV}`
        },

        modules : [ path.join( `${__dirname}/../node_modules` ) ]

    },

    plugins : [
        new webpack.LoaderOptionsPlugin( {
            debug   : false,
            port    : defaultSettings.port,
            additionalPaths,
            context : defaultSettings.srcPath
        } )
    ],
};
