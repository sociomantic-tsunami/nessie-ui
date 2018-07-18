import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import isEqual              from 'lodash.isequal';

import { buildClassName }   from '../utils';
import styles               from './scrollBox.css';
import IconButton           from '../IconButton';
import ScrollBar            from '../ScrollBar';


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
         *  on scroll callback function
         */
        onScroll           : PropTypes.func,
        /**
         *  Scroll direction
         */
        scroll             : PropTypes.oneOf( [
            'horizontal',
            'vertical',
            'both',
        ] ),
        /**
         *  Display Scroll bars
         */
        scrollBarsAreVisible : PropTypes.bool,
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
        scrollDownIsVisible  : PropTypes.bool,
    };

    static defaultProps =
    {
        children             : undefined,
        className            : undefined,
        contentWidth         : undefined,
        cssMap               : styles,
        height               : undefined,
        onClickScrollDown    : undefined,
        onClickScrollLeft    : undefined,
        onClickScrollRight   : undefined,
        onClickScrollUp      : undefined,
        onScroll             : undefined,
        scroll               : 'both',
        scrollBarsAreVisible : true,
        scrollBoxRef         : undefined,
        scrollDownIsVisible  : false,
        scrollLeftIsVisible  : false,
        scrollRightIsVisible : false,
        scrollUpIsVisible    : false,
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
        if ( !this.innerRef )
        {
            return;
        }

        const { state } = this;

        // space taken by native scrollbars
        const diffX = state.offsetWidth - state.clientWidth;
        const diffY = state.offsetHeight - state.clientHeight;

        if ( diffX || diffY )
        {
            return {
                width        : `calc( 100% + ${diffX}px )`,
                height       : `calc( 100% + ${diffY}px )`,
                maxHeight    : this.props.height,
                marginRight  : `${diffY}px`,
                marginBottom : `${diffX}px`,
            };
        }
    }

    getNewState()
    {
        const newState = {};
        Object.keys( this.state ).forEach( key =>
            newState[ key ] = this.innerRef[ key ] );

        return newState;
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

        const { onScroll } = this.props;
        if ( onScroll )
        {
            onScroll( e );
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
                scrollBars.push(
                    <ScrollBar
                        className   = { cssMap.scrollBarHorizontal }
                        key         = "horizontal"
                        onChange    = { props.onChangeScrollBarX }
                        orientation = "horizontal"
                        scrollPos   = { scrollLeft }
                        thumbSize   = {
                            `${( clientWidth / scrollWidth ) * 100}%`
                        }
                        scrollMax = { scrollWidth - clientWidth } />
                );
            }
        }

        if ( scroll !== 'horizontal' )
        {
            const { clientHeight, scrollHeight, scrollTop } = this.state;

            if ( scrollHeight > clientHeight )
            {
                scrollBars.push(
                    <ScrollBar
                        className   = { cssMap.scrollBarVertical }
                        key         = "vertical"
                        onChange    = { props.onChangeScrollBarY }
                        orientation = "vertical"
                        scrollPos   = { scrollTop }
                        thumbSize   = {
                            `${( clientHeight / scrollHeight ) * 100}%`
                        }
                        scrollMax = { scrollHeight - clientHeight  }
                        length    = { `${clientHeight}px` } />
                );
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
                scrollButtons.push(
                    <IconButton
                        className = { props.cssMap[ `icon${dir}` ] }
                        iconSize  = "S"
                        iconType  = { dir.toLowerCase() }
                        key       = { dir }
                        onClick   = { props[ `onClickScroll${dir}` ] } />
                );
            }
        } );

        return scrollButtons;
    }

    render()
    {
        const {
            children,
            className,
            contentWidth,
            cssMap,
            scroll,
            scrollBarsAreVisible,
        } = this.props;

        return (
            <div
                className = { buildClassName( className, cssMap, { scroll } ) }>
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
