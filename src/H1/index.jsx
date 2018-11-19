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

const H1 = ( {
    cssMap,
    className,
    children,
    title,
    role,
} ) => (
    <h1 className = { buildClassName( className, cssMap, { role } ) }>
        { children || title }
    </h1>
);

H1.propTypes =
{
    /**
    *  Title text
    */
    title : PropTypes.string,
    /**
    *  Role (style) to apply to heading
    */
    role  : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical',
    ] ),
};

H1.defaultProps =
{
    title : undefined,
    role  : 'default',
};

H1.displayName = 'H1';

export default H1;
