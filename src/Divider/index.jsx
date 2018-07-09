import React from 'react';

   

const Divider = ( { cssMap, className } ) =>
{
    if ( !Divider.didWarn )
    {
        console.warn( 'Divider is deprecated and will be removed in the next \
major release' );

        Divider.didWarn = true;
    }

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
