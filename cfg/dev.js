const baseConfig = require( './base' );

module.exports = baseConfig( {
    mode   : 'development',
    inline : false,
    output : {
        filename      : 'index.dev.js',
        library       : 'Nessie',
        libraryTarget : 'window',
    },
    externals : {
        'prop-types' : 'PropTypes',
        react        : 'React',
    },
} );
