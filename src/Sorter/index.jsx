/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';

import { buildClassName }              from '../utils';
import Icon                            from '../Icon';

export default class Sorter extends Component
{
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
        cssMap          : require( './sorter.css' ),
        forceHover      : false,
        sort            : 'none',
        sorterIsVisible : true,
    };

    constructor()
    {
        super();
        this.state = { isHovered: false };
        this.toggleHover = this.toggleHover.bind( this );
    }

    toggleHover()
    {
        this.setState( { isHovered: !this.state.isHovered } );
    }

    render()
    {
        const {
            children,
            className,
            cssMap,
            forceHover,
            onToggle,
            sort,
            sorterIsVisible,
        } = this.props;

        const { isHovered } = this.state;
        const fakeHovered = isHovered || forceHover;

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    desc          : sort,
                    fakeHovered   : forceHover,
                    sort,
                    sorterVisible : sorterIsVisible,
                }  ) }
                onClick = { onToggle }>
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
