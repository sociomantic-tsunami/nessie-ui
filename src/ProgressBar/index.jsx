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
import { evalTheme }        from '../Theming/withTheme';

export default class ProgressBar extends React.PureComponent
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
        const { className, progressPercentage } = this.props;

        const cssMap = evalTheme( this.context.ProgressBar, this.props );

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
