/* global addEventListener removeEventListener */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */


import React                     from 'react';
import PropTypes                 from 'prop-types';

import { clamp, buildClassName } from '../utils';
import styles                    from './scrollBar.css';


const ScrollBar = ( {
    className,
    cssMap,
    onChange,
    onClickTrack,
    onMouseOut,
    onMouseOver,
    orientation,
    scrollBoxId,
    scrollMax,
    scrollMin,
    scrollPos,
    thumbSize,
} ) =>
{
    const isVertical = orientation === 'vertical';
    const scrollLength = Math.abs( scrollMax - scrollMin );
    const thumbOffset =
        `calc( ${scrollPos / scrollLength} * ( 100% - ${thumbSize} ) )`;

    let trackRef = null;
    let thumbRef = null;

    return (
        <div
            aria-controls    = { scrollBoxId }
            aria-orientation = { orientation }
            aria-valuenow    = { scrollPos }
            aria-valuemin    = { scrollMin }
            aria-valuemax    = { scrollMax }
            className = { buildClassName( className, cssMap, {
                orientation,
            } ) }
            onClick = { e =>
            {
                if ( e.target !== e.currentTarget || !onClickTrack )
                {
                    return;
                }

                const trackLength = isVertical ?
                    trackRef.clientHeight : trackRef.clientWidth;
                const clickOffset = isVertical ?
                    e.nativeEvent.offsetY : e.nativeEvent.offsetX;

                const scale = scrollLength / trackLength;
                const newPos = clickOffset * scale;

                onClickTrack( newPos );
            } }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            ref          = { ref => trackRef = ref }
            role         = "scrollbar">
            <div
                className   = { cssMap.thumb }
                onMouseDown = { md =>
                {
                    if ( !onChange )
                    {
                        return;
                    }

                    md.preventDefault();

                    const initialMouse = isVertical ? md.clientY : md.clientX;
                    const trackLength = isVertical ?
                        trackRef.clientHeight : trackRef.clientWidth;

                    const thumbLength = isVertical ?
                        thumbRef.clientHeight : thumbRef.clientWidth;

                    const scale = scrollLength / ( trackLength - thumbLength );

                    const handleMouseMove = mv =>
                    {
                        const mouse = isVertical ? mv.clientY : mv.clientX;
                        const mouseDiff = mouse - initialMouse;
                        const scrollDiff = mouseDiff * scale;

                        const newPos = clamp(
                            scrollPos + scrollDiff,
                            scrollMin, scrollMax
                        );

                        onChange( newPos );
                    };

                    addEventListener( 'mousemove', handleMouseMove );
                    addEventListener( 'mouseup', function handleMouseUp()
                    {
                        removeEventListener( 'mousemove', handleMouseMove );
                        removeEventListener( 'mouseup', handleMouseUp );
                    } );
                } }
                ref   = { ref => thumbRef = ref }
                style = { {
                    [ isVertical ? 'height' : 'width' ] : thumbSize,
                    [ isVertical ? 'top'    : 'left'  ] : thumbOffset,
                } } />
        </div>
    );
};

ScrollBar.propTypes =
{
    /**
     *  Extra CSS class name
     */
    className    : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap       : PropTypes.objectOf( PropTypes.string ),
    /**
     *  orientation of the ScrollBar
     */
    orientation  : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  scroll position change callback function: ( scrollPos, e ) => { ... }
     */
    onChange     : PropTypes.func,
    /**
     *  scroll track click callback function: ( scrollPos, e ) => { ... }
     */
    onClickTrack : PropTypes.func,
    /**
     *  mouse out callback function: e => { ... }
     */
    onMouseOut   : PropTypes.func,
    /**
     *  mouse over callback function: e => { ... }
     */
    onMouseOver  : PropTypes.func,
    /**
     *  id of the ScrollBox controlled by this ScrollBar
     */
    scrollBoxId  : PropTypes.string,
    /**
     *  Max scroll value
     */
    scrollMax    : PropTypes.number,
    /**
     *  Min scroll value
     */
    scrollMin    : PropTypes.number,
    /**
     *  Current scroll position
     */
    scrollPos    : PropTypes.number,
    /**
     *  Scroll thumb size (CSS unit)
     */
    thumbSize    : PropTypes.string,
};

ScrollBar.defaultProps =
{
    className   : undefined,
    cssMap      : styles,
    onChange    : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    orientation : 'horizontal',
    scrollBoxId : undefined,
    scrollMax   : 0,
    scrollMin   : 0,
    scrollPos   : 0,
    thumbSize   : '20px',
};

export default ScrollBar;
