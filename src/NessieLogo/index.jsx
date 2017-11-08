import React                from 'react';

import Css                  from '../hoc/Css';

const NessieLogo = ( { cssMap, className } ) =>
    <Css cssMap = { cssMap }>
        <img
            alt       = ""
            className = { className }
            src       = "images/nessie.svg" />
    </Css>;

NessieLogo.propTypes = {};

NessieLogo.defaultProps =
{
    cssMap : require( './nessieLogo.css' )
};

export default NessieLogo;
