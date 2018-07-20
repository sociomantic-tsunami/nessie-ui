import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';

const Spinner = ( { cssMap, className, size } ) =>
    <div className = { buildClassName( className, cssMap, { size } ) } />;

Spinner.propTypes =
{
    /**
     *  Size of the Spinner
     */
    size : PropTypes.oneOf( [ 'small',
        'big'
    ] )
};

Spinner.defaultProps =
{
    cssMap : require( './spinner.css' ),
    size   : 'small'
};

export default Spinner;
