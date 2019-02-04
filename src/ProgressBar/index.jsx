/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import ThemeContext     from '../Theming/ThemeContext';
import { createCssMap } from '../Theming';

export default class ProgressBar extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Current percentage value
         */
        percentage : PropTypes.number,
    };

    static defaultProps =
    {
        percentage : 0,
    };

    render()
    {
        const { percentage } = this.props;

        const cssMap = createCssMap( this.context.ProgressBar, this.props );

        return (
            <div className = { cssMap.default }>
                { percentage > 0 &&
                <div
                    style = { { width: `${percentage}%` } }
                    className = { cssMap.fill } />
                }
            </div>
        );
    }
}
