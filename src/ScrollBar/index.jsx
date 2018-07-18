/* eslint-disable jsx-a11y/no-static-element-interactions */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './scrollBar.css';


const ScrollBar = ( {
    className,
    cssMap,
    onClickTrack,
    onMouseDownThumb,
    onMouseOut,
    onMouseOver,
    orientation,
    scrollMax,
    scrollMin,
    scrollPos,
    scrollBoxId,
    thumbSize,
} ) =>
{
    const multiplier = scrollPos / Math.abs( scrollMax - scrollMin );
    const thumbOffset = `calc( ${multiplier} * ( 100% - ${thumbSize} ) )`;

    const isVertical = orientation === 'vertical';

    const thumbStyle = {
        [ isVertical ? 'height' : 'width' ] : thumbSize,
        [ isVertical ? 'top' : 'left' ]     : thumbOffset,
    };

    return (
        <div
            role             = "scrollbar"
            aria-controls    = { scrollBoxId }
            aria-orientation = { orientation }
            aria-valuenow    = { scrollPos }
            aria-valuemin    = { scrollMin }
            aria-valuemax    = { scrollMax }
            className = { buildClassName( className, cssMap, {
                orientation,
            } ) }
            onClickTrack = { onClickTrack }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }>
            <div
                className   = { cssMap.thumb }
                onMouseDown = { e =>
                {
                    e.preventDefault();
                    onMouseDownThumb && onMouseDownThumb( e );
                } }
                style = { thumbStyle } />
        </div>
    );
};

ScrollBar.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className   : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Orientation of the scroll bar
     */
    orientation : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  scroll track click callback function : ( e ) => { ... }
     */
    onClickTrack  : PropTypes.func,
    /**
     *  scroll thumb mouse down callback function : ( e ) => { ... }
     */
    onMouseDownThumb  : PropTypes.func,
    /**
     *  mouse out callback function : ( e ) => { ... }
     */
    onMouseOut  : PropTypes.func,
    /**
     *  mouse over callback function : ( e ) => { ... }
     */
    onMouseOver : PropTypes.func,
    /**
     *  Max scroll value
     */
    scrollMax   : PropTypes.number,
    /**
     *  Min scroll value
     */
    scrollMin   : PropTypes.number,
    /**
     *  Scroll position
     */
    scrollPos   : PropTypes.number,
    /**
     *  Scroll thumb size (CSS unit)
     */
    thumbSize   : PropTypes.string,
};

ScrollBar.defaultProps =
{
    className   : undefined,
    cssMap      : styles,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    orientation : 'horizontal',
    scrollMax   : 100,
    scrollMin   : 0,
    scrollPos   : 0,
    thumbSize   : undefined,
};

export default ScrollBar;
