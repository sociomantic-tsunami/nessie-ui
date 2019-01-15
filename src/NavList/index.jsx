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

export default class NavList extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  List content (NavItems)
         */
        children  : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  How to lay out the list items
         */
        layout    : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    };

    static defaultProps =
    {
        cssMap    : undefined,
        className : undefined,
        children  : undefined,
        layout    : 'horizontal',
    };

    static displayName = 'NavList';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.NavList, this.props ),
        } = this.props;

        return <ul className = { cssMap.main }>{ children }</ul>;
    }
}
