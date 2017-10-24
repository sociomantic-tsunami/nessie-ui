import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import { IconButton }       from '../index';

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
        onToggle        : PropTypes.func
    };

    static defaultProps =
    {
        sort            : 'none',
        sorterIsVisible : true,
        forceHover      : false,
        cssMap          : require( './sorter.css' )
    };

    constructor()
    {
        super();
        this.state = { isHovered: false };
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
            sorterIsVisible
        } = this.props;

        const { isHovered } = this.state;
        const fakeHovered   = isHovered || forceHover;

        const toggleHover = () => this.setState( { isHovered: !isHovered  } );

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    sorterVisible : sorterIsVisible,
                    sort,
                    desc          : sort,
                    fakeHovered   : forceHover
                } }>
                <div
                    className = { className }
                    onClick   = { onToggle }>
                    <div
                        className   = { cssMap.content }
                        onMouseOver = { toggleHover }
                        onMouseOut  = { toggleHover }>
                        { children }
                    </div>
                    { sorterIsVisible &&
                        <div className = { cssMap.sorter }>
                            <IconButton
                                className  = { cssMap.up }
                                iconSize   = "S"
                                role       = "light"
                                iconType   = "up"
                                forceHover =
                                    { fakeHovered || sort === 'asc' } />
                            <IconButton
                                className  = { cssMap.down }
                                iconSize   = "S"
                                role       = "light"
                                iconType   = "down"
                                forceHover =
                                    { fakeHovered || sort === 'desc' } />
                        </div>
                    }
                </div>
            </Css>
        );
    }
}
