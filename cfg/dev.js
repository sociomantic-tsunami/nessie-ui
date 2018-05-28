const path                 = require( 'path' );

const HappyPack            = require( 'happypack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack              = require( 'webpack' );

const baseConfig           = require( './base' );
const defaultSettings      = require( './defaults' );


const config = Object.assign( {}, baseConfig, {
    entry : path.join( __dirname, '../src/index.js' ),

    output : {
        path          : path.join( __dirname, '/../dist' ),
        filename      : 'displayComponents.js',
        publicPath    : defaultSettings.publicPath,
        library       : 'DisplayComponents', // do we need tothers
        libraryTarget : 'window'
    },

    cache : true,

    devtool : 'source-map',

    mode : 'development',

    externals :
    {
        'prop-types' : 'PropTypes',
        react        : 'React',
        'react-dom'  : 'ReactDOM',
    },

    optimization : {
        splitChunks : {
            cacheGroups : {
                commons : {
                    test      : /[\\/]node_modules[\\/]/,
                    name      : 'commonchunks',
                    chunks    : 'all',
                    minChunks : 4
                }
            }
        },
        runtimeChunk : false,
    },

    plugins : [
        new MiniCssExtractPlugin( {
            fallback  : 'style-loader',
            filename  : 'displayComponentStyles.css',
            allChunks : true
        } ),

        new webpack.LoaderOptionsPlugin( {
            debug : false
        } ),

        new HappyPack( {
            id      : 'js',
            loaders : [ 'babel-loader' ],
            threads : 2
        } ),

        new HappyPack( {
            id      : 'styles',
            loaders : [
                {
                    loader  : 'css-loader',
                    options :
                    {
                        modules        : true,
                        localIdentName : '[name]__[local]__[hash:base64:5]',
                        importLoaders  : 1
                    }
                },
                {
                    loader : 'postcss-loader'
                }
            ],
            threads : 2
        } ),

    ],

    module : defaultSettings.getDefaultModules()
} );


module.exports = config;
