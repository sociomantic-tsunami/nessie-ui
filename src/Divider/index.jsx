import React                from 'react';

import { buildClassName }   from '../utils';

const Divider = ( { cssMap, className } ) =>
{
    if ( !Divider.didWarn )
    {
        console.warn( 'Divider is deprecated and will be removed in the next \
major release' );

        Divider.didWarn = true;
    }

    return (

        <hr className = { buildClassName( className, cssMap ) } />

    );
};

Divider.defaultProps =
{
    cssMap : require( './divider.css' ),
};

export default Divider;
