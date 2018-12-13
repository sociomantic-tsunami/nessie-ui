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
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

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
            className,
            cssMap = createCssMap( this.context.ProgressBar, this.props ),
            progressPercentage,
        } = this.props;

        return (
            <div className = { buildClassName( className, cssMap ) }>
                { progressPercentage > 0 &&
                <div
                    style = { { width: `${progressPercentage}%` } }
                    className = { cssMap.fill } />
                }
            </div>
        );
    }
}
