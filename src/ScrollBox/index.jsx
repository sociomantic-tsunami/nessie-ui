import React                    from 'react';
import PropTypes                from 'prop-types';

import { buildClassName }       from '../utils';
import styles                   from './scrollBox.css';
import { createScrollHandler }  from './utils';
import IconButton               from '../IconButton';

const ScrollBox = ( {
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
} ) =>
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
            onScroll  = { createScrollHandler( onScroll ) }
            ref       = { scrollBoxRef }
            style     = { { maxHeight: height ? `${height}` : null } }>
            <div
                className = { cssMap.content }
                style =
                    { { width: contentWidth ? `${contentWidth}%` : null  } }>
                { children }
            </div>
        </div>
    </div>;

ScrollBox.propTypes =
{
    /**
     *  ScrollBox content
     */
    children           : PropTypes.node,
    /**
     *  ScrollBox content width, , specified in rem %
     */
    contentWidth       : PropTypes.number,
    /**
     *  ScrollBox height
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
     * Callback ref: ( ref ) => { ... }
     */
    scrollBoxRef         : PropTypes.func,
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

ScrollBox.defaultProps =
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

export default ScrollBox;
