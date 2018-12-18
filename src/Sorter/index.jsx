/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { Icon }             from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming/createCss';

export default class Sorter extends Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Sorter text/content
         */
        children        : PropTypes.node,
        /*
        * Force hover
         */
        forceHover      : PropTypes.bool,
        /**
         *  Sort direction
         */
        sort            : PropTypes.oneOf( [ 'asc', 'desc', 'none' ] ),
        /**
         *  Show the sorter
         */
        sorterIsVisible : PropTypes.bool,
        /**
         *  onToggle callback function
         */
        onToggle        : PropTypes.func,
    };

    static defaultProps =
    {
        forceHover      : false,
        sort            : 'none',
        sorterIsVisible : true,
    };

    static displayName = 'Sorter';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Sorter, this.props ),
            onToggle,
            sorterIsVisible,
        } = this.props;


        return (
            <div className = { cssMap.main } onClick = { onToggle }>
                <div
                    className    = { cssMap.content }
                    onMouseEnter = { this.toggleHover }
                    onMouseLeave = { this.toggleHover }>
                    { children }
                </div>
                { sorterIsVisible &&
                    <div className = { cssMap.sorter }>
                        <Icon
                            className  = { cssMap.up }
                            size       = "S"
                            type       = "up" />
                        <Icon
                            className  = { cssMap.down }
                            size       = "S"
                            type       = "down" />
                    </div>
                }
            </div>
        );
    }
}
