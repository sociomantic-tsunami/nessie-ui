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

export default class Page extends React.Component
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
        overflow : 'auto',
    };

    static displayName = 'Page';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Page, this.props ),
        } = this.props;

        return <div className = { cssMap.main }>{ children }</div>;
    }
}
