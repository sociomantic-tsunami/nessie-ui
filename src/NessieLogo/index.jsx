import React                               from 'react';

import { buildClassName }                  from '../utils';

const NessieLogo = ( { cssMap, className } ) =>

    <img
        alt       = ""
        className = { buildClassName( className, cssMap ) }
        src       = "images/nessie.svg" />;

NessieLogo.propTypes = {};

NessieLogo.defaultProps =
{
    cssMap : require( './nessieLogo.css' )
};

export default NessieLogo;
