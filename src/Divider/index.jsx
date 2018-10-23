/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';

const Divider = ( { cssMap, className, isVertical } ) =>
{
    if ( !Divider.didWarn )
    {
        console.warn( 'Divider is deprecated and will be removed in the next \
major release' );

        Divider.didWarn = true;
    }

    return (

        <hr
            className  = { buildClassName( className, cssMap, {
                isVertical,
            } ) } />

    );
};

Divider.propTypes =
{
    /**
     *  Vertical Divider
     */
    isVertical : PropTypes.bool,
};

Divider.defaultProps =
{
    isVertical : false,
    cssMap     : require( './divider.css' ),
};

export default Divider;
