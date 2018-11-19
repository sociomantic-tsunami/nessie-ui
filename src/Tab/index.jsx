/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';


const Tab = ( {
    children,
    className,
    cssMap,
    label,
} ) => (
    <div
        className  = { buildClassName( className, cssMap ) }
        aria-label = { label }
        role       = "tabpanel">
        { children }
    </div>
);

Tab.propTypes =
{
    /**
     * Section content
     */
    children  : PropTypes.node,
    /**
     * Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label to show in TabButton of this tab
     */
    label     : PropTypes.string,
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    label     : undefined,
};

Tab.displayName = 'Tab';

export default Tab;
