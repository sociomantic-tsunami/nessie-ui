import React                                    from 'react';
import PropTypes                                from 'prop-types';

import Component                                from '../proto/Component';
import { buildClassName }                       from '../utils';
import styles                                   from './scrollBox.css';
import { createScrollHandler, handleScroll }    from './utils';
import IconButton                               from '../IconButton';

export default class ScrollBox extends Component
{
    static propTypes =
    {
        /**
         *  ScrollBox content
         */
        children           : PropTypes.node,
        /**
         *  ScrollBox content width, any CSS length string
         */
        contentWidth       : PropTypes.string,
        /**
         *  ScrollBox height, any CSS length string
         */
        height             : PropTypes.string,
        /**
         *  on click scroll down icon callback function
         */
        onClickScrollDown  : PropTypes.func,
        /**
         *  on click scroll left icon callback function
         */
        onClickScrollLeft  : PropTypes.func,
        /**
         *  on click scroll right icon callback function
         */
        onClickScrollRight : PropTypes.func,
        /**
         *  on click scroll up icon callback function
         */
        onClickScrollUp    : PropTypes.func,
        /**
         *  on scroll callback function
         */
        onScroll           : PropTypes.func,
        /**
         *  Scroll direction
         */
        scroll             : PropTypes.oneOf( [
            'horizontal',
            'vertical',
            'both'
        ] ),
        /**
         * DOM element "Scrollbox inner"
         */
        scrollBoxRef         : PropTypes.string,
        /**
         *  Display Scroll left icon
         */
        scrollLeftIsVisible  : PropTypes.bool,
        /**
         *  Display Scroll right icon
         */
        scrollRightIsVisible : PropTypes.bool,
        /**
         *  Display Scroll up icon
         */
        scrollUpIsVisible    : PropTypes.bool,
        /**
         *  Display Scroll down icon
         */
        scrollDownIsVisible  : PropTypes.bool
    };

    static defaultProps =
    {
        children             : undefined,
        cssMap               : styles,
        height               : undefined,
        onClickScrollDown    : undefined,
        onClickScrollLeft    : undefined,
        onClickScrollRight   : undefined,
        onClickScrollUp      : undefined,
        onScroll             : undefined,
        scroll               : undefined,
        scrollBoxRef         : undefined,
        scrollDownIsVisible  : false,
        scrollLeftIsVisible  : false,
        scrollRightIsVisible : false,
        scrollUpIsVisible    : false
    };

    constructor( props )
    {
        super( props );
        this.state = {};
        this.handleScroll = this.handleScroll.bind( this );
    }

    handleScroll( e )
    {
        const { scroll } = this.props;
        const target = e.target.value;
        const delta = Math.floor( e.deltaY );

        const type = e.type === 'change' || e.type === 'input';
        const val = type ? parseInt( target ) : parseInt( target ) + delta;

        this.scrollBoxRef[ scroll === 'horizontal' ? 'scrollLeft' : 'scrollTop' ] = val;
        console.log( scroll );
    }

    render()
    {
        const {
            cssMap,
            children,
            className,
            contentWidth,
            height,
            onClickScrollDown,
            onClickScrollLeft,
            onClickScrollRight,
            onClickScrollUp,
            onScroll,
            scroll,
            scrollBoxRef,
            scrollDownIsVisible,
            scrollLeftIsVisible,
            scrollRightIsVisible,
            scrollUpIsVisible
        } = this.props;

        return (
            <div className = { buildClassName( className, cssMap, { scroll } ) }>
                { scrollDownIsVisible && <IconButton
                    className = { cssMap.icon__down }
                    iconType = "down"
                    iconSize = "L"
                    onClick = { onClickScrollDown } /> }
                { scrollLeftIsVisible && <IconButton
                    className = { cssMap.icon__left }
                    iconType = "left"
                    iconSize = "L"
                    onClick = { onClickScrollLeft  } /> }
                { scrollRightIsVisible && <IconButton
                    className = { cssMap.icon__right }
                    iconType = "right"
                    iconSize = "L"
                    onClick = { onClickScrollRight } /> }
                { scrollUpIsVisible && <IconButton
                    className = { cssMap.icon__up }
                    iconType = "up"
                    iconSize = "L"
                    onClick = { onClickScrollUp } /> }
                <input
                    defaultValue = "0"
                    type         = "range"
                    onChange     = { this.handleScroll }
                    onInput      = { this.handleScroll }
                    onWheel      = { this.handleScroll } />
                <div
                    className = { cssMap.scrollBox }
                    onScroll  = { createScrollHandler( onScroll, scroll ) }
                    ref       = { r => this.scrollBoxRef = r }
                    style     = { { maxHeight: height ? `${height}` : null } } >


                    <div
                        className = { cssMap.content }
                        style     = { { width: contentWidth } }>
                        { children }
                    </div>
                </div>
            </div>
        );
    }
}
