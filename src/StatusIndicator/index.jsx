/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                           from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';

const deprecatedStatusOptions = [ 'active', 'deactivated' ];


const StatusIndicator = ( {
    children, className, cssMap, label, status,
} ) =>
{
    if ( deprecatedStatusOptions.includes( status ) &&
        !StatusIndicator.didWarn[ status ] )
    {
        console.warn( `StatusIndicator: 'status' option '${status}' is \
deprecated. Please use one of 'alert', 'critical' or 'promoted' instead.` );
        StatusIndicator.didWarn[ status ] = true;
    }

    return (
        <div className = { buildClassName( className, cssMap, { status } ) }>
            { children || label }
        </div>
    );
};

StatusIndicator.propTypes =
{
    /**
     *  Status text (JSX node; overrides label prop)
     */
    children : PropTypes.node,
    /**
     *  CSS class map
     */
    cssMap   : PropTypes.objectOf( PropTypes.string ),
    /**
    *  Status text
    */
    label    : PropTypes.string,
    /**
     *  Display as active/deactivated
     */
    status   : PropTypes.oneOf( [ 'alert', 'critical', 'promoted' ] ),
};

StatusIndicator.defaultProps =
{
    children : undefined,
    label    : undefined,
    status   : 'promoted',
};

StatusIndicator.displayName = 'StatusIndicator';

StatusIndicator.didWarn = {};

export default StatusIndicator;
