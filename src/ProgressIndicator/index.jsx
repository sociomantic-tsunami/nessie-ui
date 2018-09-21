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


const ProgressIndicator = ( {
    cssMap,
    className,
    currentPercentage,
    showPercentage
} ) =>


    <div className = { buildClassName( className, cssMap ) }>
        <div className = { cssMap.spinner }>
            { showPercentage &&
            <div className = { cssMap.percentageContainer }>
                <span className = { cssMap.percentage } >
                    { currentPercentage }%
                </span>
            </div>
            }
        </div>
    </div>;

ProgressIndicator.propTypes =
{
    /**
     *  Show percentage
     */
    showPercentage    : PropTypes.bool,
    /**
     *  Current percentage value
     */
    currentPercentage : PropTypes.number
};

ProgressIndicator.defaultProps =
{
    cssMap         : require( './progressIndicator.css' ),
    showPercentage : true
};

export default ProgressIndicator;
