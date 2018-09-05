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
