import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Icon                 from '../Icon';

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
        this.state = {
            isHovered : false
        };
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
                            <Icon
                                className  = { cssMap.up }
                                size       = "S"
                                theme      = "light"
                                type       = "up"
                                forceHover = {
                                    fakeHovered || sort === 'asc'
                                } />
                            <Icon
                                className  = { cssMap.down }
                                size       = "S"
                                theme      = "light"
                                type       = "down"
                                forceHover = {
                                    fakeHovered || sort === 'desc'
                                } />
                        </div>
                    }
                </div>
            </Css>
        );
    }
}
