const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin       = require( 'uglifyjs-webpack-plugin' );


const paths = require( './paths' );


const localIdentName = process.env.REACT_WEBPACK_ENV === 'dev' ?
    '[name]__[local]__[hash:base64:5]' : '[name]__[local]';

module.exports = ( options = {} ) => ( {
    mode   : options.mode,
    entry  : options.entry || paths.index,
    output : {
        path : paths.dist,
        ...options.output,
    },
    resolve : {
        extensions : [ '.js', '.json', '.jsx' ],
        modules    : [ paths.src, paths.nodeModules ],
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
                    !options.inline ? MiniCssExtractPlugin.loader : {
                        loader  : 'style-loader',
                        options : {
                            insertAt : 'top',
                        },
                    },
                    {
                        loader  : 'css-loader',
                        options :
                        {
                            importLoaders : 1,
                            localIdentName,
                            modules       : true,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test : /\.(png|jpg|gif)$/,
                use  : {
                    loader  : 'url-loader',
                    options : { limit: 8192 },
                },
            },
            {
                test : /\.svg$/,
                use  : {
                    loader  : 'url-loader',
                    options :
                    {
                        limit    : 8192,
                        mimetype : 'image/svg+xml',
                    },
                },
            },
        ],
    },
    optimization : options.mode === 'production' && {
        minimizer : [
            new UglifyJsPlugin( {
                cache     : true,
                parallel  : true,
                sourceMap : true,
            } ),
        ],
    },
    externals : options.externals,
    plugins   : [
        !options.inline && new MiniCssExtractPlugin( {
            allChunks : true,
            filename  : 'styles.css',
        } ),
        ...options.plugins,
    ].filter( Boolean ),
    devtool : options.mode === 'production' ? 'source-map' : 'eval',
} );
