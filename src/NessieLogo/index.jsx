/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';

import { buildClassName }   from '../utils';


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
