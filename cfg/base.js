const path = require( 'path' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );


const localIdentName = process.env.REACT_WEBPACK_ENV === 'dev' ?
    '[name]__[local]__[hash:base64:5]' : '[name]__[local]';

module.exports = {
    output  : { path: path.join( __dirname, '../dist' ) },
    resolve : {
        extensions : [ '.js', '.json', '.jsx' ],
        modules    : [ path.join( __dirname, '../node_modules' ) ],
    },
    alias : {
        react : './node_modules/react'
    },
    module : {
        rules : [
            {
                test : /\.jsx?$/,
                use  : 'babel-loader',
            },
            {
                test : /\.css$/,
                use  : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader  : 'css-loader',
                        options :
                        {
                            importLoaders : 1,
                            modules       : true,
                            localIdentName,
                        }
                    },
                    'postcss-loader',
                ],
            },
            {
                test : /\.(png|jpg|gif)$/,
                use  : {
                    loader  : 'url-loader',
                    options : { limit: 8192 },
                }
            },
            {
                test : /\.svg$/,
                use  : {
                    loader  : 'url-loader',
                    options :
                    {
                        limit    : 8192,
                        mimetype : 'image/svg+xml'
                    }
                },
            },
            {
                test : /\.html$/,
                use  : 'raw-loader'
            },
        ]
    }
};
