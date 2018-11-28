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

export default class ProgressIndicator extends React.PureComponent
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
            className,
            currentPercentage,
            showPercentage,
        } = this.props;

        const cssMap = evalTheme( this.context.ProgressIndicator, this.props );

        return (
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
            </div>
        );
    }
}
