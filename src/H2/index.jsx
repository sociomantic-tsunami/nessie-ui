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
import styles             from './h2.css';

const H2 = ( {
    cssMap,
    className,
    children,
    title,
    role,
} ) => (
    <h2 className = { buildClassName( className, cssMap, { role } ) }>
        { children || title }
    </h2>
);

H2.propTypes =
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

H2.defaultProps =
{
    title  : undefined,
    role   : 'default',
    cssMap : styles,
};

export default H2;
