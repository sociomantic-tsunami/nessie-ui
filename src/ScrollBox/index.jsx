import React, { Component }                                 from 'react';
import PropTypes                                            from 'prop-types';

import { buildClassName, generateId }                       from '../utils';
import styles                                               from './scrollBox.css';
import { createScrollHandler }                              from './utils';
import IconButton                                           from '../IconButton';
import ScrollBar                                            from '../ScrollBar';

export default class ScrollBox extends Component
{
    static propTypes =
    {
        /**
         *  ScrollBox content
         */
        children           : PropTypes.node, /**
        /**
         *  ScrollBox content width, any CSS length string
         */
        contentWidth       : PropTypes.string,
        /**
         *  ScrollBox height, any CSS length string
         */
        height             : PropTypes.string,
        /**
         *  ScrollBox ID
         */
        id                 : PropTypes.string,
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
        className            : styles.scrollBox,
        cssMap               : styles,
        height               : undefined,
        id                   : generateId( 'ScrollBox' ),
        onClickScrollDown    : undefined,
        onClickScrollLeft    : undefined,
        onClickScrollRight   : undefined,
        onClickScrollUp      : undefined,
        onScroll             : undefined,
        scroll               : 'both',
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
            scrollPosX      : 0,
            scrollPosY      : 0,
            scrollMax       : {},
            scrollBarLength : {},
            thumbSize       : {}
        };
        this.handleChangeX = this.handleChangeX.bind( this );
        this.handleChangeY = this.handleChangeY.bind( this );
        this.handleScroll = this.handleScroll.bind( this );
        this.getScrollMax = this.getScrollMax.bind( this );
        this.updateScrollBarLength = this.updateScrollBarLength.bind( this );
        this.updateThumbSize = this.updateThumbSize.bind( this );
    }

    calcNativeScrollBar()
    {
        const target = this.scrollBoxRef;
        const width = target.offsetWidth - target.clientWidth;
        const height = target.offsetHeight - target.clientHeight;

        target.style.setProperty( '--ScrollBarWidth', `${width}px` );
        target.style.setProperty( '--ScrollBarHeight', `${height}px` );

        target.style.setProperty( '--ScrollBarMarginX', `-${width}px` );
        target.style.setProperty( '--ScrollBarMarginY', `-${height}px` );
    }

    componentDidMount()
    {
        this.setState( {
            scrollMax       : this.getScrollMax(),
            scrollBarLength : this.updateScrollBarLength(),
            thumbSize       : this.updateThumbSize()
        } );

        this.calcNativeScrollBar();
    }

    componentDidUpdate( prevProps )
    {
        const { scrollPosX, scrollPosY } = this.state;

        this.scrollBoxRef.scrollLeft = scrollPosX;
        this.scrollBoxRef.scrollTop  = scrollPosY;

        if ( ( prevProps.scroll !== this.props.scroll ) || ( prevProps.contentWidth !== this.props.contentWidth ) || ( prevProps.height !== this.props.height ) )
        {
            this.setState( {
                scrollMax       : this.getScrollMax(),
                scrollBarLength : this.updateScrollBarLength(),
                thumbSize       : this.updateThumbSize()
            } );
        }
    }

    getScrollMax()
    {
        const horizontal = this.scrollBoxRef.scrollWidth - this.scrollBoxRef.clientWidth;
        const vertical   = this.scrollBoxRef.scrollHeight - this.scrollBoxRef.clientHeight;
        return  { horizontal, vertical };
    }

    handleChangeX( newVal )
    {
        this.setState( {
            scrollPosX : newVal
        } );
    }

    handleChangeY( newVal )
    {
        this.setState( {
            scrollPosY : newVal
        } );
    }

    handleScroll()
    {
        this.setState( {
            scrollPosX : this.scrollBoxRef.scrollLeft,
            scrollPosY : this.scrollBoxRef.scrollTop
        } );
    }
    updateScrollBarLength()
    {
        return { horizontal: this.scrollBoxRef.parentNode.clientWidth, vertical: this.scrollBoxRef.parentNode.clientHeight };
    }

    updateThumbSize()
    {
        const forWidth = this.scrollBoxRef.scrollWidth > this.scrollBoxRef.clientWidth;
        const forHeight = this.scrollBoxRef.scrollHeight > this.scrollBoxRef.clientHeight;

        const deductWidth = ( this.scrollBoxRef.clientWidth / this.scrollBoxRef.scrollWidth ) * 100;
        const equalWidth = 0;

        const deductHeight = ( this.scrollBoxRef.clientHeight / this.scrollBoxRef.scrollHeight ) * 100;
        const equalHeight = 0;

        const calcWidth = forWidth ? deductWidth : equalWidth;
        const calcHeight = forHeight ? deductHeight : equalHeight;

        return { horizontal: calcWidth, vertical: calcHeight };
    }

    render()
    {
        const {
            cssMap,
            children,
            className,
            contentWidth,
            height,
            id,
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
            scrollPosX,
            scrollPosY,
            scrollMax,
            scrollBarLength,
            thumbSize
        } = this.state;

        return (
            <div
                className = { buildClassName( className, cssMap, { scroll } ) }
                id = { id }
                onScroll  = { createScrollHandler( onScroll, scroll ) }>
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
                    className = { cssMap.inner }
                    onScroll  = { this.handleScroll }
                    ref       = { e => this.scrollBoxRef = e }
                    style     = { { maxHeight: height ? `${height}` : null } }>
                    <div
                        className = { cssMap.content }
                        style     = { { width: contentWidth } }>
                        { children }
                    </div>
                </div>
                { ( scroll === 'horizontal' || scroll === 'both' )  && Boolean( thumbSize.horizontal ) &&
                <ScrollBar
                    className    = { cssMap.scrollBar }
                    onChange     = { this.handleChangeX }
                    orientation  = "horizontal"
                    scrollPos    = { scrollPosX }
                    thumbSize    = { thumbSize.horizontal }
                    scrollMax    = { scrollMax.horizontal }
                    length       = { scrollBarLength.horizontal } />
                }
                { ( scroll === 'vertical' || scroll === 'both' ) && Boolean( thumbSize.vertical ) &&
                    <ScrollBar
                        className    = { cssMap.scrollBar }
                        onChange     = { this.handleChangeY }
                        orientation  = "vertical"
                        scrollPos    = { scrollPosY }
                        thumbSize    = { thumbSize.vertical }
                        scrollMax    = { scrollMax.vertical }
                        length       = { scrollBarLength.vertical } />
                }
            </div>
        );
    }
}
