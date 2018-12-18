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
import { createCssMap }     from '../Theming/createCss';

export default class ProgressIndicator extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
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
        showPercentage : true,
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
