/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
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

export default class Tab extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Section content
         */
        children  : PropTypes.node,
        /**
         * Extra CSS classname
         */
        className : PropTypes.string,
        /**
         * CSS classname map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Label to show in TabButton of this tab
         */
        label     : PropTypes.string,
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
        label     : undefined,
    };

    static displayName = 'Tab';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Tab, this.props ),
            label,
        } = this.props;

        return (
            <div
                className  = { cssMap.main }
                aria-label = { label }
                role       = "tabpanel">
                { children }
            </div>
        );
    }
}
