import React from 'react';

import Css   from '../hoc/Css';

const Divider = ( { cssMap, className } ) =>
{
    console.warn( 'Divider is deprecated and will be removed in the next major \
release');

    return (
        <Css cssMap = { cssMap }>
            <hr className = { className } />
        </Css>
    );
};

Divider.defaultProps =
{
    cssMap : require( './divider.css' )
};

export default Divider;
