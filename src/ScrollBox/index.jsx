/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component }    from 'react';
import PropTypes               from 'prop-types';
import isEqual                 from 'lodash.isequal';

import { createScrollHandler } from './utils';
import { buildClassName }      from '../utils';
import styles                  from './scrollBox.css';
import IconButton              from '../IconButton';
import ScrollBar               from '../ScrollBar';


export default class ScrollBox extends Component
{
    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className          : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap             : PropTypes.objectOf( PropTypes.string ),
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
         *  mouseOver callback function
         */
        onMouseOver        : PropTypes.func,
        /**
         *  mouseOut callback function
         */
        onMouseOut         : PropTypes.func,
        /**
         *  on scroll callback function
         */
        onScroll           : PropTypes.func,
        /**
         *  scroll down button click callback function
         */
        onClickScrollDown  : PropTypes.func,
        /**
         *  scroll left button click callback function
         */
        onClickScrollLeft  : PropTypes.func,
        /**
         *  scroll right button click callback function
         */
        onClickScrollRight : PropTypes.func,
        /**
         *  scroll up button click callback function
         */
        onClickScrollUp    : PropTypes.func,
        /**
         *  Scroll direction
         */
        scroll             : PropTypes.oneOf( [
            'horizontal',
            'vertical',
            'both',
        ] ),
        /**
         *  Horizontal Scroll Amount
         */
        scrollAmountHorizontal : PropTypes.number,
        /**
         *  Vertical Scroll Amount
         */
        scrollAmountVertical   : PropTypes.number,
        /**
        *   ScrollBox padding
        */
        padding                : PropTypes.oneOfType( [
            PropTypes.oneOf( [ 'none', 'S', 'M', 'L', 'XL', 'XXL' ] ),
            PropTypes.arrayOf( PropTypes.oneOf( [
                'none',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
            ] ) ),
        ] ),
        /**
         *  Display Scroll bars
         */
        scrollBarsAreVisible   : PropTypes.bool,
        /**
         * DOM element "Scrollbox inner"
         */
        scrollBoxRef           : PropTypes.string,
        /**
         *  Display Scroll down icon
         */
        scrollDownIsVisible    : PropTypes.bool,
        /**
         *  Display Scroll down icon
         */
        scrollIndicatorVariant : PropTypes.oneOf( [ 'circle', 'gradient' ] ),
        /**
         *  Display Scroll left icon
         */
        scrollLeftIsVisible    : PropTypes.bool,
        /**
         *  Display Scroll right icon
         */
        scrollRightIsVisible   : PropTypes.bool,
        /**
         *  Display Scroll up icon
         */
        scrollUpIsVisible      : PropTypes.bool,
    };

    static defaultProps =
    {
        children               : undefined,
        className              : undefined,
        contentWidth           : undefined,
        cssMap                 : styles,
        height                 : undefined,
        onMouseOut             : undefined,
        onMouseOver            : undefined,
        onScroll               : undefined,
        onClickScrollDown      : undefined,
        onClickScrollLeft      : undefined,
        onClickScrollRight     : undefined,
        onClickScrollUp        : undefined,
        padding                : 'none',
        scroll                 : 'both',
        scrollBarsAreVisible   : true,
        scrollBoxRef           : undefined,
        scrollDownIsVisible    : false,
        scrollAmountHorizontal : undefined,
        scrollIndicatorVariant : 'circle',
        scrollLeftIsVisible    : false,
        scrollRightIsVisible   : false,
        scrollUpIsVisible      : false,
        scrollAmountVertical   : undefined,
    };

    constructor()
    {
        super();

        this.state = {
            clientHeight : null,
            clientWidth  : null,
            offsetHeight : null,
            offsetWidth  : null,
            scrollHeight : null,
            scrollLeft   : null,
            scrollTop    : null,
            scrollWidth  : null,
        };

        this.handleClickTrackX = this.handleClickTrackX.bind( this );
        this.handleClickTrackY = this.handleClickTrackY.bind( this );
        this.handleChangeX = this.handleChangeX.bind( this );
        this.handleChangeY = this.handleChangeY.bind( this );
        this.handleRef = this.handleRef.bind( this );
        this.handleScroll = this.handleScroll.bind( this );
    }

    componentDidMount()
    {
        this.setState( this.getNewState() );
    }

    componentDidUpdate()
    {
        const newState = this.getNewState();

        if ( !isEqual( newState, this.state ) )
        {
            this.setState( newState );
        }
    }

    getInnerStyle()
    {
        const style = { maxHeight: this.props.height };

        if ( this.innerRef )
        {
            const { state } = this;

            // space taken by native scrollbars
            const diffX = state.offsetWidth - state.clientWidth;
            const diffY = state.offsetHeight - state.clientHeight;

            if ( diffX || diffY )
            {
                Object.assign( style, {
                    width        : diffX ? `calc( 100% + ${diffX}px )` : null,
                    height       : diffY ? `calc( 100% + ${diffY}px )` : null,
                    marginRight  : diffX ? `-${diffX}px` : null,
                    marginBottom : diffY ? `-${diffY}px` : null,
                } );
            }
            else
            {
                // compensate for macOS overlaid scrollbars
                const compo = 20;

                Object.assign( style, {
                    padding : `${compo}px`,
                    margin  : `-${compo}px`,
                } );
            }
        }

        return style;
    }

    getNewState()
    {
        const newState = {};
        Object.keys( this.state ).forEach( key =>
            newState[ key ] = this.innerRef[ key ] );

        return newState;
    }

    handleClickTrackX( pos )
    {
        const { clientWidth, scrollLeft } = this.state;
        const increment = pos >= scrollLeft ? clientWidth : -clientWidth;

        this.innerRef.scrollLeft = scrollLeft + increment;
    }

    handleClickTrackY( pos )
    {
        const { clientHeight, scrollTop } = this.state;
        const increment = pos >= scrollTop ? clientHeight : -clientHeight;

        this.innerRef.scrollTop = scrollTop + increment;
    }

    handleChangeX( pos )
    {
        this.innerRef.scrollLeft = pos;
    }

    handleChangeY( pos )
    {
        this.innerRef.scrollTop = pos;
    }

    handleRef( ref )
    {
        if ( ref )
        {
            if ( this.props.scrollBoxRef )
            {
                this.props.scrollBoxRef( ref );
            }

            this.innerRef = ref;
        }
    }

    handleScroll( e )
    {
        this.forceUpdate();

        const { props } = this;

        if ( props.onScroll )
        {
            createScrollHandler( props.onScroll, props.scroll )( e );
        }
    }

    renderScrollBars()
    {
        if ( !this.innerRef )
        {
            return;
        }

        const { props } = this;
        const { cssMap, scroll } = props;

        const scrollBars = [];

        if ( scroll !== 'vertical' )
        {
            const { clientWidth, scrollLeft, scrollWidth } = this.state;

            if ( scrollWidth > clientWidth )
            {
                scrollBars.push( <ScrollBar
                    className        = { cssMap.scrollBarHorizontal }
                    key              = "horizontal"
                    onClickTrack     = { this.handleClickTrackX }
                    onChange         = { this.handleChangeX }
                    orientation      = "horizontal"
                    scrollPos        = { scrollLeft }
                    thumbSize        = {
                        `${( clientWidth / scrollWidth ) * 100}%`
                    }
                    scrollMax = { scrollWidth - clientWidth } /> );
            }
        }

        if ( scroll !== 'horizontal' )
        {
            const { clientHeight, scrollHeight, scrollTop } = this.state;

            if ( scrollHeight > clientHeight )
            {
                scrollBars.push( <ScrollBar
                    className        = { cssMap.scrollBarVertical }
                    key              = "vertical"
                    onClickTrack     = { this.handleClickTrackY }
                    onChange         = { this.handleChangeY }
                    orientation      = "vertical"
                    scrollPos        = { scrollTop }
                    thumbSize        = {
                        `${( clientHeight / scrollHeight ) * 100}%`
                    }
                    scrollMax = { scrollHeight - clientHeight  }
                    length    = { `${clientHeight}px` } /> );
            }
        }

        return scrollBars;
    }

    renderScrollButtons()
    {
        const { props } = this;
        const scrollButtons = [];

        [ 'Down', 'Left', 'Right', 'Up' ].forEach( dir =>
        {
            if ( props[ `scroll${dir}IsVisible` ] )
            {
                scrollButtons.push( <IconButton
                    className     = { props.cssMap[ `icon${dir}` ] }
                    hasBackground = {
                        props.scrollIndicatorVariant === 'circle' }
                    iconSize      = "S"
                    iconType      = { dir.toLowerCase() }
                    key           = { dir }
                    onClick       = {
                        this.clickScrollButton.bind( this, dir ) } /> );
            }
        } );

        return scrollButtons;
    }

    clickScrollButton( direction )
    {
        const {
            clientHeight, clientWidth, scrollTop, scrollLeft,
        } = this.state;

        const {
            onClickScrollDown, onClickScrollLeft, onClickScrollRight,
            onClickScrollUp,
        } = this.props;

        let { scrollAmountHorizontal, scrollAmountVertical } = this.props;

        if ( typeof scrollAmountVertical === 'undefined' )
        {
            scrollAmountVertical = clientHeight;
        }

        if ( typeof scrollAmountHorizontal === 'undefined' )
        {
            scrollAmountHorizontal = clientWidth;
        }

        if ( direction === 'Down' )
        {
            if ( onClickScrollDown ) onClickScrollDown();
            this.handleChangeY( scrollTop + scrollAmountVertical );
        }

        if ( direction === 'Left' )
        {
            if ( onClickScrollLeft ) onClickScrollLeft();
            this.handleChangeX( scrollLeft - scrollAmountHorizontal );
        }

        if ( direction === 'Right' )
        {
            if ( onClickScrollRight ) onClickScrollRight();
            this.handleChangeX( scrollAmountHorizontal + scrollLeft );
        }

        if ( direction === 'Up' )
        {
            if ( onClickScrollUp ) onClickScrollUp();
            this.handleChangeY( scrollTop - scrollAmountVertical );
        }
    }

    render()
    {
        const {
            children,
            className,
            contentWidth,
            cssMap,
            height,
            onMouseOut,
            onMouseOver,
            padding,
            scroll,
            scrollBarsAreVisible,
            scrollIndicatorVariant,
        } = this.props;

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    paddingX : Array.isArray( padding ) ?
                        padding[ 0 ] : padding,
                    paddingY : Array.isArray( padding ) ?
                        padding[ 1 ] : padding,
                    scroll,
                    scrollBarsAreVisible,
                    scrollIndicatorVariant,
                } ) }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }
                style        = { { maxHeight: height } }>
                <div
                    className = { cssMap.inner }
                    onScroll  = { this.handleScroll }
                    ref       = { this.handleRef }
                    style     = { this.getInnerStyle() }>
                    <div
                        className = { cssMap.content }
                        style     = { contentWidth && { width: contentWidth } }>
                        { children }
                    </div>
                </div>
                { this.renderScrollButtons() }
                { scrollBarsAreVisible && this.renderScrollBars() }
            </div>
        );
    }
}
