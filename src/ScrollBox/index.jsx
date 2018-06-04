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
            scrollPosX     : 0,
            scrollPosY     : 0,
            scrollMax      : {},
            scrollBarWidth : {},
            thumbSize      : {}
        };
        this.handleChangeX = this.handleChangeX.bind( this );
        this.handleChangeY = this.handleChangeY.bind( this );
        this.handleWheel = this.handleWheel.bind( this );
        this.getScrollMax = this.getScrollMax.bind( this );
        this.updateScrollBarWidth = this.updateScrollBarWidth.bind( this );
        this.updateThumbSize = this.updateThumbSize.bind( this );
    }

    componentDidMount()
    {
        this.setState( {
            scrollMax      : this.getScrollMax(),
            scrollBarWidth : this.updateScrollBarWidth(),
            thumbSize      : this.updateThumbSize()
        } );
    }

    componentDidUpdate( prevProps )
    {
        const { scrollPosX, scrollPosY } = this.state;

        this.scrollBoxRef.scrollLeft = scrollPosX;
        this.scrollBoxRef.scrollTop  = scrollPosY;

        if ( (prevProps.scroll !== this.props.scroll ) || (prevProps.contentWidth !== this.props.contentWidth ) || (prevProps.height !== this.props.height ) )
        {
            this.setState( {
                scrollMax      : this.getScrollMax(),
                scrollBarWidth : this.updateScrollBarWidth(),
                thumbSize      : this.updateThumbSize()
            } );
        }
    }

    getScrollMax()
    {
        const horizontal = this.scrollBoxRef.scrollWidth - this.scrollBoxRef.clientWidth;
        const vertical   = this.scrollBoxRef.scrollHeight - this.scrollBoxRef.clientHeight;
        return  { horizontal, vertical };
    }

    handleWheel( e )
    {
        e.preventDefault();
        const{ deltaX = 0, deltaY = 0 } = e;
        const { scroll } = this.props;

        this.setState( prevState => ( {
            ...prevState,
            scrollPosX : (scroll === 'horizontal' || scroll === 'both') ? prevState.scrollPosX + deltaX : prevState.scrollPosX,
            scrollPosY : (scroll === 'vertical' || scroll === 'both') ? prevState.scrollPosY + deltaY : prevState.scrollPosY,
        } ) );
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

    updateScrollBarWidth()
    {
        return { horizontal: this.scrollBoxRef.clientWidth, vertical: this.scrollBoxRef.clientHeight };
    }

    updateThumbSize()
    {

        const forWidth = this.scrollBoxRef.scrollWidth > this.scrollBoxRef.clientWidth;
        const forHeight = this.scrollBoxRef.scrollHeight > this.scrollBoxRef.clientHeight;

        const deductWidth = (this.scrollBoxRef.clientWidth / this.scrollBoxRef.scrollWidth) * 100 ;
        const equalWidth = 0;

        const deductHeight = (this.scrollBoxRef.clientHeight / this.scrollBoxRef.scrollHeight) * 100;
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
            scrollBarWidth,
            thumbSize } = this.state;

        return (
            <div className = { buildClassName( className, cssMap, { scroll } ) } >
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
                { ( scroll === 'horizontal' || scroll === 'both' )  &&
                <ScrollBar
                    className    = { cssMap.scrollBar }
                    scrollPos    = { scrollPosX }
                    onChange     = { this.handleChangeX }
                    orientation  = { 'horizontal' }
                    thumbSize    = { thumbSize.horizontal }
                    scrollMax    = { scrollMax.horizontal }
                    width        = { scrollBarWidth.horizontal } />
                }
                { ( scroll === 'vertical' || scroll === 'both' ) &&
                    <ScrollBar
                        className    = { cssMap.scrollBar }
                        scrollPos    = { scrollPosY }
                        onChange     = { this.handleChangeY }
                        orientation  = { 'vertical' }
                        thumbSize    = { thumbSize.vertical }
                        scrollMax    = { scrollMax.vertical }
                        width        = { scrollBarWidth.vertical } />

                }
            </div>
        );
    }
}
