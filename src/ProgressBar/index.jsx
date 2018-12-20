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

export default class ProgressBar extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Current percentage value
         */
        progressPercentage : PropTypes.number,
    };

    static defaultProps =
    {
        progressPercentage : 0,
    };

    static displayName = 'ProgressBar';

    render()
    {
        const {
            cssMap = createCssMap( this.context.ProgressBar, this.props ),
            progressPercentage,
        } = this.props;

        return (
            <div className = { cssMap.main }>
                { progressPercentage > 0 &&
                    <div
                        className = { cssMap.fill }
                        style     = { { width: `${progressPercentage}%` } } />
                }
            </div>
        );
    }
}
