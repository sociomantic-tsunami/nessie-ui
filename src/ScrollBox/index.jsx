import React                                    from 'react';
import PropTypes                                from 'prop-types';

import Component                                from '../proto/Component';
import { buildClassName }                       from '../utils';
import styles                                   from './scrollBox.css';
import { createScrollHandler }                  from './utils';
import IconButton                               from '../IconButton';
import ScrollBar                                from '../ScrollBar';

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
        this.state = {
            scrollPos     : 0,
            scrollMax      : 0,
            scrollBarWidth : 0
        };
        this.handleChange = this.handleChange.bind( this );
        this.handleWheel = this.handleWheel.bind( this );
        this.getScrollMax = this.getScrollMax.bind( this );
        this.updateScrollBarWidth = this.updateScrollBarWidth.bind( this );
    }

    componentDidMount()
    {
        this.getScrollMax();
        this.updateScrollBarWidth();
    }

    componentDidUpdate()
    {
        const { scrollPos } = this.state;
        const { scroll } = this.props;
        this.scrollBoxRef[ scroll === 'horizontal' ? 'scrollLeft' : 'scrollTop' ] = scrollPos;
        this.getScrollMax();
        this.updateScrollBarWidth();
    }

    getScrollMax()
    {
        const { scroll } = this.props;
        const horizontal = this.scrollBoxRef.scrollWidth - this.scrollBoxRef.clientWidth;
        const vertical   = this.scrollBoxRef.scrollHeight - this.scrollBoxRef.clientHeight;
        this.setState( prevState => ( {
            ...prevState,
            scrollMax : scroll === 'horizontal' ?  horizontal : vertical
        } ) );
    }

    updateScrollBarWidth()
    {
        const { scroll } = this.props;
        const { scrollBarWidth } = this.state;
        this.setState( prevState => ( {
            ...prevState,
            scrollBarWidth : scroll === 'horizontal' ?  this.scrollBoxRef.clientWidth : this.scrollBoxRef.clientHeight
        } ) );
    }
    handleWheel( e )
    {
        this.setState( prevState => ( {
            ...prevState,
            scrollPos : prevState.scrollPos + e.deltaY
        } ) );
    }

    handleChange( newVal )
    {
        this.setState( prevState => ( {
            ...prevState,
            scrollPos : newVal
        } ) );
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

        const {
            scrollPos,
            scrollMax,
            scrollBarWidth
        } = this.state;

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
                <div
                    className = { cssMap.scrollBox }
                    onScroll  = { createScrollHandler( onScroll, scroll ) }
                    onWheel   = { this.handleWheel }
                    style     = { { maxHeight: height ? `${height}` : null } }
                    ref       = { e => this.scrollBoxRef = e } >
                    <div
                        className = { cssMap.content }
                        style     = { { width: contentWidth } }>
                        { children }
                    </div>
                </div>
                <ScrollBar
                    className    = { cssMap.scrollBar }
                    defaultValue = { 0 }
                    scrollPos    = { scrollPos }
                    onChange     = { this.handleChange }
                    orientation  = { scroll }
                    scrollMax    = { scrollMax }
                    width        = { scrollBarWidth } />
            </div>
        );
    }
}
