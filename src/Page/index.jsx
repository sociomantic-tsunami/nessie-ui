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

export default class Page extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Page content
         */
        children : PropTypes.node,

        /**
         * Page overflow setting
         *
         */
        overflow : PropTypes.oneOf( [
            'auto',
            'hidden',
            'visible',
            'scroll',
            'scrollX',
            'scrollY',
        ] ),
    };

    static defaultProps =
    {
        scroll : 'auto',
    };

    static displayName = 'Page';

    render()
    {
        const {
            children,
            className,
            cssMap = evalTheme( this.context.Page, this.props ),
            overflow,
        } = this.props;

        return (
            <div
                className = { buildClassName(
                    className,
                    cssMap,
                    { overflow },
                ) }>
                { children }
            </div>
        );
    }
}
