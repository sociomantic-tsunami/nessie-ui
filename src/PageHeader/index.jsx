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

export default class PageHeader extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  PageHeader content
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

    static displayName = 'PageHeader';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.PageHeader, this.props ),
        } = this.props;

        return <header className = { cssMap.main }>{ children }</header>;
    }
}
