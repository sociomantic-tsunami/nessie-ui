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

const ProgressBar = ( { cssMap, className, progressPercentage } ) =>
    <div className = { buildClassName( className, cssMap ) }>
        { progressPercentage > 0 &&
        <div
            style = { { width: `${progressPercentage}%` } }
            className = { cssMap.fill } />
        }
    </div>;

ProgressBar.propTypes =
{
    /**
     *  Current percentage value
     */
    progressPercentage : PropTypes.number,
};

ProgressBar.defaultProps =
{
    cssMap             : require( './progressBar.css' ),
    progressPercentage : 0,
};

export default ProgressBar;
