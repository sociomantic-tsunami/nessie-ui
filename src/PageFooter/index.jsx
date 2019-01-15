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

export default class PageFooter extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  PageFooter content
         */
        children  : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
    };

    static defaultProps =
    {
        children  : undefined,
        className : undefined,
        cssMap    : undefined,
    };

    static displayName = 'PageFooter';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.PageFooter, this.props ),
        } = this.props;

        return (
            <footer className = { cssMap.main }>
                <div className = { cssMap.content }>{ children }</div>
            </footer>
        );
    }
}
