const paths      = require( './paths' );
const baseConfig = require( './base' );


/* webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production */
const distConfig = ( options = {} ) => baseConfig( {
    mode   : 'production',
    entry  : paths.index,
    output : {
        libraryTarget : 'umd',
        filename      : options.outputFilename || 'index.js',
    },
    inline    : options.inline,
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
} );

const components = distConfig( {
    inline         : true,
    outputFilename : 'index.js',
} );

const componentsJS = distConfig( {
    inline         : false,
    outputFilename : 'componentsJS.js',
} );

module.exports = [
    components,
    componentsJS,
];
