import React                from 'react';

import Css                  from '../hoc/Css';

const Divider = ( { cssMap, className } ) =>
    <Css cssMap = { cssMap }>
        <hr className = { className } />
    </Css>;

Divider.defaultProps =
{
    cssMap : require( './divider.css' )
};

export default Divider;
