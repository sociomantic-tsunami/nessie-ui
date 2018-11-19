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

const Page = ( {
    children,
    cssMap,
    className,
    overflow,
} ) =>

    <div className = { buildClassName( className, cssMap, { overflow } ) }>
        { children }
    </div>;

Page.propTypes =
{
    /**
     *  Page content
     */
    children : PropTypes.node,

    /**
     * Page overflow setting
     *
     */
    overflow : PropTypes.oneOf( [
        'auto',
        'hidden',
        'visible',
        'scroll',
        'scrollX',
        'scrollY',
    ] ),
};

Page.defaultProps =
{
    scroll : 'auto',
};

Page.displayName = 'Page';

export default Page;
