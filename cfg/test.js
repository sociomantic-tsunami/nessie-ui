const fs                = require( 'fs' );
const path              = require( 'path' );

// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HappyPack         = require( 'happypack' );

const defaultSettings   = require( './defaults' );
const baseConfig        = require( './base' );


module.exports = Object.assign( {}, baseConfig, {
    externals :
    {
        'react/addons'                   : true,
        'react/lib/ExecutionEnvironment' : true,
        'react/lib/ReactContext'         : true,
        'react-dom/test-utils'           : true,
        'react-test-renderer/shallow'    : true
    },

    module :
    {
        rules :
        [
            {
                test   : /\.(md)$/,
                loader : 'null-loader'
            },
            {
                test : /\.(png|jpg|gif|woff|woff2)$/,
                use  : [
                    {
                        loader  : 'url-loader',
                        options :
                        {
                            limit : 8192
                        }
                    }
                ]
            },
            {
                test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use  : [
                    {
                        loader  : 'url-loader',
                        options :
                        {
                            limit    : 8192,
                            mimetype : 'image/svg+xml'
                        }
                    }
                ]
            },
            {
                test : /\.(css|sass|scss|less|styl)$/,
                use  : [
                    MiniCssExtractPlugin.loader,
                    'happypack/loader?id=styles'
                ],
            },
            {
                test : /\.jsx?$/,
                use  : {
                    loader  : 'happypack/loader',
                    options : { id: 'js' }
                },
                include : /\/src/,
            },
            {
                test : /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use  : 'null-loader'
            },
            {
                test : /\.html$/,
                use  : 'raw-loader'
            },
        ]
    },
    resolve :
    {
        extensions : [ '.js', '.jsx' ],
        alias      :
        {
            'nessie-ui'     : `${defaultSettings.srcPath}/index`,
            componentDriver : `${defaultSettings.srcPath}/Testing/index`,
            fonts           : `${defaultSettings.srcPath}/proto/webfonts/`
        }
    },
    plugins :
    [
        new MiniCssExtractPlugin( {
            fallback  : 'style-loader',
            filename  : 'styles.css',
            allChunks : true
        } ),
        new HappyPack( {
            id      : 'js',
            enabled : true,
            loaders : [ 'babel-loader' ],
            threads : 2
        } ),
        new HappyPack( {
            id      : 'styles',
            loaders :
            [
                {
                    loader  : 'css-loader',
                    options :
                    {
                        modules        : true,
                        localIdentName : '[name]__[local]',
                        importLoaders  : 1,
                        context        : fs.realpathSync(
                            path.join( __dirname, '/../src' )
                        ),
                    }
                },
                {
                    loader : 'postcss-loader'
                }
            ],
            threads : 2
        } )
    ]
} );
