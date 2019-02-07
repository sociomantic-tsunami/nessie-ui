/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global addEventListener removeEventListener */

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */


import React, { useCallback }  from 'react';
import PropTypes               from 'prop-types';

import { attachEvents, clamp } from '../utils';
import { useTheme }            from '../Theming';

const componentName = 'ScrollBar';

const ScrollBar = props =>
{
    const {
        onChange,
        onClickTrack,
        orientation,
        scrollBoxId,
        scrollMax,
        scrollMin,
        scrollPos,
        thumbSize,
    } = props;

    const cssMap = useTheme( componentName, props );
    const isVertical = orientation === 'vertical';
    const scrollLength = Math.abs( scrollMax - scrollMin );
    const thumbOffset =
            `calc( ${scrollPos / scrollLength} * ( 100% - ${thumbSize} ) )`;

    const trackRef = React.createRef();
    const thumbRef = React.createRef();

    const handleClick = e =>
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
    };

    const handleMouseDown = md =>
    {
        if ( !onChange )
        {
            return;
        }

        md.preventDefault;
        const initialMouse = isVertical ?
            md.clientY : md.clientX;
        const trackLength = isVertical ?
            trackRef.clientHeight : trackRef.clientWidth;

        const thumbLength = isVertical ?
            thumbRef.clientHeight : thumbRef.clientWidth;

        const scale =
                scrollLength / ( trackLength - thumbLength );

        const handleMouseMove = mv =>
        {
            const mouse = isVertical ? mv.clientY : mv.clientX;
            const mouseDiff = mouse - initialMouse;
            const scrollDiff = mouseDiff * scale;

            const newPos = clamp(
                scrollPos + scrollDiff,
                scrollMin, scrollMax,
            );

            onChange( newPos );
        };

        addEventListener( 'mousemove', handleMouseMove );
        addEventListener( 'mouseup', function handleMouseUp()
        {
            removeEventListener( 'mousemove', handleMouseMove );
            removeEventListener( 'mouseup', handleMouseUp );
        } );
    };

    return (
        <div
            { ...attachEvents( props ) }
            aria-controls    = { scrollBoxId }
            aria-orientation = { orientation }
            aria-valuemax    = { scrollMax }
            aria-valuemin    = { scrollMin }
            aria-valuenow    = { scrollPos }
            className        = { cssMap.main }
            onClick          = { useCallback( handleClick,
                [ trackRef, onClickTrack ] ) }
            ref  = { trackRef }
            role = "scrollbar">
            <div
                className   = { cssMap.thumb }
                onMouseDown = { useCallback( handleMouseDown,
                    [ thumbRef, onChange ] ) }
                ref   = { thumbRef }
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
     *  scroll position change callback function: ( { scrollPos } ) => ...
     */
    onChange     : PropTypes.func,
    /**
     *  scroll track click callback function: ( { scrollPos } ) => ...
     */
    onClickTrack : PropTypes.func,
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
    className    : undefined,
    cssMap       : undefined,
    onChange     : undefined,
    onClickTrack : undefined,
    orientation  : 'horizontal',
    scrollBoxId  : undefined,
    scrollMax    : 0,
    scrollMin    : 0,
    scrollPos    : 0,
    thumbSize    : '20px',
};

ScrollBar.displayName = componentName;

export default ScrollBar;
