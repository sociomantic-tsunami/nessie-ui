/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
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


import React                     from 'react';
import PropTypes                 from 'prop-types';

import { clamp, buildClassName } from '../utils';
import ThemeContext              from '../Theming/ThemeContext';
import { evalTheme }             from '../Theming/withTheme';

export default class ScrollBar extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className        : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap           : PropTypes.objectOf( PropTypes.string ),
        /**
         *  orientation of the ScrollBar
         */
        orientation      : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
        /**
         *  scroll position change callback function:
         *  ( scrollPos, e ) => { ... }
         */
        onChange         : PropTypes.func,
        /**
         *  scroll track click callback function: ( scrollPos, e ) => { ... }
         */
        onClickTrack     : PropTypes.func,
        /**
         *  mouse out callback function: e => { ... }
         */
        onMouseOut       : PropTypes.func,
        /**
         *  mouse over callback function: e => { ... }
         */
        onMouseOver      : PropTypes.func,
        /**
         *  Thumb drag start callback function: e => { ... }
         */
        onThumbDragStart : PropTypes.func,
        /**
         *  Thumb drag end callback function: e => { ... }
         */
        onThumbDragEnd   : PropTypes.func,
        /**
         *  id of the ScrollBox controlled by this ScrollBar
         */
        scrollBoxId      : PropTypes.string,
        /**
         *  Max scroll value
         */
        scrollMax        : PropTypes.number,
        /**
         *  Min scroll value
         */
        scrollMin        : PropTypes.number,
        /**
         *  Current scroll position
         */
        scrollPos        : PropTypes.number,
        /**
         *  Scroll thumb size (CSS unit)
         */
        thumbSize        : PropTypes.string,
    };

    static defaultProps =
    {
        className        : undefined,
        onChange         : undefined,
        onMouseOut       : undefined,
        onMouseOver      : undefined,
        orientation      : 'horizontal',
        onThumbDragStart : undefined,
        onThumbDragEnd   : undefined,
        scrollBoxId      : undefined,
        scrollMax        : 0,
        scrollMin        : 0,
        scrollPos        : 0,
        thumbSize        : '20px',
    };

    static displayName = 'ScrollBar';

    render()
    {
        const {
            className,
            onChange,
            onClickTrack,
            onThumbDragStart,
            onThumbDragEnd,
            onMouseOut,
            onMouseOver,
            orientation,
            scrollBoxId,
            scrollMax,
            scrollMin,
            scrollPos,
            thumbSize,
        } = this.props;

        const cssMap = evalTheme( this.context.ScrollBar, this.props );

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
                        if ( onThumbDragStart )
                        {
                            onThumbDragStart();
                        }

                        if ( !onChange )
                        {
                            return;
                        }

                        md.preventDefault();

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
                            if ( onThumbDragEnd )
                            {
                                onThumbDragEnd();
                            }

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
    }
}
