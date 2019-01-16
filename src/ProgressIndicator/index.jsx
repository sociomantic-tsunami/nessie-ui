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

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class ProgressIndicator extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className         : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap            : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Show percentage
         */
        showPercentage    : PropTypes.bool,
        /**
         *  Current percentage value
         */
        currentPercentage : PropTypes.number,
    };

    static defaultProps =
    {
        className         : undefined,
        cssMap            : undefined,
        showPercentage    : true,
        currentPercentage : 0,
    };

    static displayName = 'ProgressIndicator';

    render()
    {
        const {
            cssMap = createCssMap( this.context.ProgressIndicator, this.props ),
            currentPercentage,
            showPercentage,
        } = this.props;

        return (
            <div className = { cssMap.main }>
                <div className = { cssMap.spinner }>
                    { showPercentage &&
                        <div className = { cssMap.percentageContainer }>
                            <span className = { cssMap.percentage } >
                                { currentPercentage }%
                            </span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
