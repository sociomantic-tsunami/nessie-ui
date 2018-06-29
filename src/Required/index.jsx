import React                       from 'react';
import PropTypes                   from 'prop-types';

import { buildClassName }          from '../utils';

const Required = ( {
    children,
    className,
    cssMap,
    isRequired,
    text
} ) =>
{
    if ( !Required.didWarn )
    {
        console.warn( 'Required: This component is deprecated and will be \
removed in the next major release.' );
        Required.didWarn = true;
    }

    return (

        <span className = { buildClassName( className, cssMap, { required: isRequired } ) }>
            { children || text }
        </span>

    );
};
Required.propTypes =
{
    /**
    *  Text to show
    */
    text       : PropTypes.string,
    /**
    *  Show as required
    */
    isRequired : PropTypes.bool
};

Required.defaultProps =
{
    isRequired : true,
    cssMap     : require( './required.css' )
};

export default Required;
