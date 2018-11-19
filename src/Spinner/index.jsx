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

const Spinner = ( { cssMap, className, size } ) =>
    <div className = { buildClassName( className, cssMap, { size } ) } />;

Spinner.propTypes =
{
    /**
     *  Size of the Spinner
     */
    size : PropTypes.oneOf( [ 'small',
        'big',
    ] ),
};

Spinner.defaultProps =
{
    size : 'small',
};

Spinner.displayName = 'Spinner';

export default Spinner;
