/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document addEventListener removeEventListener Event */

import React                      from 'react';
import PropTypes                  from 'prop-types';

import { generateId }             from '../utils';
import { IconWithTooltip, Label } from '../index';
import ThemeContext               from '../Theming/ThemeContext';
import { createCssMap }           from '../Theming';

export default class Slider extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Extra CSS class name
         */
        className             : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap                : PropTypes.objectOf( PropTypes.string ),
        /**
        *  Label text
        */
        label                 : PropTypes.string,
        /**
         * HTML id attribute
         */
        id                    : PropTypes.string,
        /**
        * Display as disabled
        */
        isDisabled            : PropTypes.bool,
        /**
        * Display as read-only
        */
        isReadOnly            : PropTypes.bool,
        /**
        * Display as error
        */
        hasError              : PropTypes.bool,
        /**
        *  Tooltip message text (string or JSX)
        */
        errorMessage          : PropTypes.node,
        /**
        *  Error Tooltip is displayed
        */
        errorMessageIsVisible : PropTypes.bool,
        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition  : PropTypes.oneOf( [
            'top',
            'topLeft',
            'topRight',
            'bottom',
            'bottomLeft',
            'bottomRight',
            'left',
            'leftTop',
            'leftBottom',
            'right',
            'rightTop',
            'rightBottom',
        ] ),
        /**
        * Display track fill
        */
        hasFill            : PropTypes.bool,
        /**
        * Sets the track fill location
        */
        fillFrom           : PropTypes.oneOf( [ 'start', 'end' ] ),
        /**
        * Display the slider horizontally/vertically
        */
        orientation        : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
        /**
        *  Step Label Start text
        */
        stepLabelStart     : PropTypes.string,
        /**
        *  Step Label End text
        */
        stepLabelEnd       : PropTypes.string,
        /**
        * Sets the position of labels
        */
        stepLabelsPosition : PropTypes.oneOf( [
            'top',
            'bottom',
            'left',
            'right',
        ] ),
        /**
        * hasHandleLabels
        */
        hasHandleLabels     : PropTypes.bool,
        /**
        * Sets the position of handle labels
        */
        handleLabelPosition : PropTypes.oneOf( [
            'top',
            'bottom',
            'left',
            'right',
        ] ),
        /**
        * Slider minimum value
        */
        minValue : PropTypes.number,
        /**
        * Slider maximum value
        */
        maxValue : PropTypes.number,
        /**
        * Slider value step
        */
        step     : PropTypes.number,
        /**
        * Slider handle value(s)
        */
        value    : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.number ),
            PropTypes.number,
        ] ),
        /**
        *  Set the track to use a logarithmic calculated value
        */
        isLogarithmic : PropTypes.bool,
        /**
        *  onBlur callback function: ( e ) => { ... }
        */
        onBlur        : PropTypes.func,
        /**
        *  onChange callback function: ( e ) => { ... }
        */
        onChange      : PropTypes.func,
        /**
        *  onClick callback function: ( e ) => { ... }
        */
        onClick       : PropTypes.func,
        /**
        *  onFocus callback function: ( e ) => { ... }
        */
        onFocus       : PropTypes.func,
        /**
        *  onKeyDown callback function: ( e ) => { ... }
        */
        onKeyDown     : PropTypes.func,
        /**
        *  onKeyUp callback function: ( e ) => { ... }
        */
        onKeyUp       : PropTypes.func,
        /**
        *  onMouseDown callback function: ( e ) => { ... }
        */
        onMouseDown   : PropTypes.func,
        /**
        *  onMouseOut callback function: ( e ) => { ... }
        */
        onMouseOut    : PropTypes.func,
        /**
        *  onMouseOver callback function: ( e ) => { ... }
        */
        onMouseOver   : PropTypes.func,
        /**
        *  onMouseUp callback function: ( e ) => { ... }
        */
        onMouseUp     : PropTypes.func,
        /**
        * Step labels
        */
        stepLabels    : PropTypes.arrayOf( PropTypes.shape( {
            step      : PropTypes.number,
            stepLabel : PropTypes.string,
        } ) ),
        /**
        * Slider ticks separators
        */
        ticks : PropTypes.arrayOf( PropTypes.shape( {
            step      : PropTypes.number,
            stepLabel : PropTypes.string,
        } ) ),
    };

    static defaultProps =
    {
        className             : undefined,
        cssMap                : undefined,
        errorMessage          : undefined,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        fillFrom              : 'start',
        handleLabelPosition   : 'top',
        hasError              : false,
        hasFill               : true,
        hasHandleLabels       : false,
        id                    : undefined,
        isDisabled            : false,
        isLogarithmic         : false,
        isReadOnly            : false,
        label                 : undefined,
        maxValue              : 100,
        minValue              : 0,
        onBlur                : undefined,
        onChange              : undefined,
        onClick               : undefined,
        onFocus               : undefined,
        onKeyDown             : undefined,
        onKeyUp               : undefined,
        onMouseDown           : undefined,
        onMouseOut            : undefined,
        onMouseOver           : undefined,
        onMouseUp             : undefined,
        orientation           : 'horizontal',
        step                  : 1,
        stepLabelEnd          : undefined,
        stepLabels            : undefined,
        stepLabelsPosition    : 'top',
        stepLabelStart        : undefined,
        ticks                 : undefined,
        value                 : 0,
    };

    static displayName = 'Slider';


    constructor( props )
    {
        super( props );

        this.state = {
            ...this.state,
            inputIndex : -1,
            id         : props.id || generateId( 'Slider' ),
        };

        this.setInputContainerRef = this.setInputContainerRef.bind( this );
        this.setTrackRef          = this.setTrackRef.bind( this );

        this.handleBlur  = this.handleBlur.bind( this );
        this.handleClick = this.handleClick.bind( this );
        this.handleFocus = this.handleFocus.bind( this );
        this.handleDown  = this.handleDown.bind( this );
        this.handleMove  = this.handleMove.bind( this );
        this.handleUp    = this.handleUp.bind( this );
    }


    /**
    * Generate track fill style object depending on input values
    * @param  {Array}   values    slider values
    * @return {Object}            style object
    */
    getTrackFillStyle( values )
    {
        const { orientation, fillFrom } = this.props;

        const maxOffset = this.getOffset( Math.max( ...values ) );

        let length;
        let offset = 0;

        if ( values.length > 1 )
        {
            const minOffset = this.getOffset( Math.min( ...values ) );

            length = Math.abs( maxOffset - minOffset );
            offset = minOffset;
        }
        else if ( fillFrom === 'start' )
        {
            length = maxOffset;
        }
        else
        {
            offset = maxOffset;
            length = 100 - maxOffset;
        }

        offset += '%'; length += '%';

        return orientation === 'vertical' ?
            { height: length, bottom: offset } :
            { width: length, left: offset };
    }


    /**
    * gets the handle offset for a given value (as a percentage)
    * @param  {Number} value   value to convert
    * @return {Number}         normalized percentage
    */
    getOffset( value )
    {
        const { isLogarithmic, minValue, maxValue } = this.props;

        if ( minValue >= maxValue || value <= minValue )
        {
            return 0;
        }

        else if ( value >= maxValue )
        {
            return 100;
        }

        if ( isLogarithmic )
        {
            const max = Math.log( maxValue );
            const min = minValue === 0 ? 0 : Math.log( minValue );

            const v = value === 0 ? 0 : Math.log( value );

            return ( 100 * ( v - min ) ) / ( max - min );
        }

        const range = maxValue - minValue;
        return ( ( value - minValue ) / range ) * 100;
    }


    /**
    * Generate a style object for handle based on input value
    * @param  {Number}  value   slider value
    * @return {Object}          style object
    */
    getHandleStyle( value )
    {
        const { orientation } = this.props;
        const offset   = `${this.getOffset( value )}%`;

        return orientation === 'vertical' ?
            { bottom: offset } : { left: offset };
    }


    /**
    * Calculates the new value based on current mouse coordinates
    * @param  {Number}   x the horizontal mouse coordinate
    * @param  {Number}   y the vertical mouse coordinate
    * @return {Number}
    */
    getValue( x, y )
    {
        const {
            isLogarithmic, orientation, maxValue, minValue,
        } = this.props;
        const { track } = this;

        const isVertical = orientation === 'vertical';

        const rect = track.getBoundingClientRect();

        const start  = isVertical ? rect.top    : rect.left;
        const end    = isVertical ? rect.bottom : rect.right;
        const length = isVertical ? rect.height : rect.width;

        const range = maxValue - minValue;
        const mouse = isVertical ? y : x;

        if ( mouse <= start )
        {
            return isVertical ? maxValue : minValue;
        }
        else if ( mouse >= end )
        {
            return isVertical ? minValue : maxValue;
        }

        let position = mouse - start;
        if ( isVertical ) // account for y-axis inversion
        {
            position = length - position;
        }

        if ( isLogarithmic )
        {
            let v = Math.round( ( ( position / length ) * range ) + minValue );
            const min = minValue === 0 ? 0 : Math.log( minValue );
            const max = Math.log( maxValue );
            v = Math.exp( ( min + ( ( max - min ) * v ) ) / maxValue );

            v = minValue + ( v - minValue );
            return v;
        }

        // linear solution
        return Math.round( ( ( position / length ) * range ) + minValue );
    }


    /**
    * Converts value to nearest step
    * @param  {Number}   value value to convert
    * @return {Number}         value converted to nearest step
    */
    getStep( value )
    {
        const { step } = this.props;
        return Math.round( value / step ) * step;
    }


    setInputContainerRef( ref )
    {
        if ( ref )
        {
            this.inputContainer = ref;
        }
    }


    setTrackRef( ref )
    {
        if ( ref )
        {
            this.track = ref;
        }
    }


    setTargetInput( index )
    {
        const { inputContainer } = this;

        if ( index >= 0 )
        {
            this.targetInput = inputContainer.childNodes[ index ];
        }
        else
        {
            this.targetInput =
                this.targetInput || inputContainer.childNodes[ 0 ];
        }
    }


    setTargetInputValue( value )
    {
        if ( String( value ) === this.targetInput.value )
        {
            return;
        }

        const { onChange } = this.props;
        const event = document.createEvent( 'Event' );
        event.initEvent( 'change', true, true );

        this.targetInput.value = String( value );
        this.targetInput.dispatchEvent( event );

        if ( onChange )
        {
            onChange( event );
        }

        this.forceUpdate();
    }


    focusTargetInput()
    {
        if ( !this.targetInput )
        {
            this.setTargetInput();
        }
        this.targetInput.focus();
    }


    /**
    * Updates target input with new value from the mouse down on track position
    * @param {Event}  event   event being passed
    */
    handleDown( event )
    {
        const { onMouseDown } = this.props;

        if ( onMouseDown )
        {
            onMouseDown( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled ||
            event.button > 0 )
        {
            return;
        }

        const index = parseInt( event.target.getAttribute( 'data-index' ) );

        if ( index >= 0 ) // target is handle
        {
            this.setTargetInput( index );

            addEventListener( event.type === 'touchstart' ?
                'touchmove' : 'mousemove', this.handleMove );
            addEventListener( event.type === 'touchstart' ?
                'touchend' : 'mouseup', this.handleUp );
        }
        else // target is track
        {
            if ( event.type === 'touchstart' ) return;

            const { clientX, clientY } = event;
            const newValue = this.getStep( this.getValue( clientX, clientY ) );

            this.setTargetInput();
            this.setTargetInputValue( newValue );
        }

        event.preventDefault();
        this.focusTargetInput();
    }


    /**
    * Updates target input with new value from handle position
    * @param {Event}  event   event being passed
    */
    handleMove( event )
    {
        let { clientX, clientY } = event;
        if ( event.touches )
        {
            clientX  = event.touches[ 0 ].clientX;
            clientY  = event.touches[ 0 ].clientY;
        }

        const newValue = this.getStep( this.getValue( clientX, clientY ) );
        this.setTargetInputValue( newValue );
    }


    /**
    *  Removes mouseMove and mouseUp listeners
    *  @param {Event}   event   event being passed
    */
    handleUp( event = new Event( 'mouseup' ) )
    {
        const { onMouseUp } = this.props;

        if ( onMouseUp )
        {
            onMouseUp( event );
        }

        removeEventListener( event.type === 'touchmove' ?
            'touchmove' : 'mousemove', this.handleMove );
        removeEventListener( event.type === 'touchmove' ?
            'touchend' : 'mouseup', this.handleUp );
    }


    handleClick( event )
    {
        const { onClick } = this.props;

        if ( onClick )
        {
            onClick( event );
        }

        if ( event.target.getAttribute( 'data-index' ) ) // target is handle
        {
            event.stopPropagation();
        }
    }

    handleFocus( event )
    {
        const { onFocus } = this.props;

        if ( onFocus )
        {
            onFocus( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled )
        {
            return;
        }

        this.setState( {
            inputIndex : parseInt( event.target.getAttribute( 'data-index' ) ),
            isGrabbing : true,
        } );
    }


    handleBlur( event )
    {
        const { onBlur } = this.props;

        if ( onBlur )
        {
            onBlur( event );
        }

        if ( event.defaultPrevented || this.props.isDisabled )
        {
            return;
        }

        this.setState( { inputIndex: -1, isGrabbing: false } );
    }


    /**
    * Get stepLabelStart and stepLabelEnd and store them
    * inside labels array of objects
    * @param  {String}   stepLabelStart Start step label
    * @param  {String}   stepLabelEnd End step label
    * @return {Object}     object
    */
    mergeStepLabels()
    {
        const {
            maxValue,
            minValue,
            stepLabelEnd,
            stepLabels = [],
            stepLabelStart,
        } = this.props;

        if ( stepLabelStart || stepLabelEnd )
        {
            return [
                { 'stepLabel': stepLabelStart, 'step': minValue },
                ...stepLabels,
                { 'stepLabel': stepLabelEnd, 'step': maxValue },
            ];
        }

        return stepLabels;
    }


    render()
    {
        const {
            cssMap = createCssMap( this.context.Slider, this.props ),
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            hasError,
            hasFill,
            isDisabled,
            isReadOnly,
            label,
            maxValue,
            minValue,
            onChange,
            onClick,
            onKeyDown,
            onKeyUp,
            onMouseDown,
            onMouseOut,
            onMouseOver,
            onMouseUp,
            step,
            stepLabelsPosition,
            ticks = [],
            value,
        } = this.props;

        const { id } = this.state;

        let values = [];

        if ( typeof value !== 'undefined' )
        {
            values = Array.isArray( value ) ? value : [ value ];
        }

        let stepLabelsTrack;
        let stepLabelsTrackEnd = false;
        const mergedStepLabelsArray = this.mergeStepLabels();

        if ( mergedStepLabelsArray && mergedStepLabelsArray.length )
        {
            stepLabelsTrack = (
                <div className = { cssMap.stepLabelsContainer }>
                    { mergedStepLabelsArray.map( ( val, i ) =>
                        <div
                            key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                            className = { cssMap.stepLabel }
                            style     = { this.getHandleStyle( val.step ) } >
                            { val.stepLabel }
                        </div> ) }
                </div>
            );
        }

        if ( stepLabelsPosition === 'bottom' || stepLabelsPosition === 'right' )
        {
            stepLabelsTrackEnd = true;
        }

        const sliderLabelMarkUp = label && (
            <IconWithTooltip
                className        = { cssMap.labelContainer }
                iconIsVisible    = { !!errorMessage && hasError && !isDisabled }
                iconPosition     = "right"
                iconType         = "error"
                message          = { errorMessage }
                noWarn
                tooltipIsVisible = { errorMessageIsVisible }
                tooltipPosition  = { errorMessagePosition }>
                <Label htmlFor = { `${id}_0` }>{ label }</Label>
            </IconWithTooltip>
        );

        const trackFillMarkUp = hasFill && (
            <div
                className = { cssMap.trackFill }
                style     = { this.getTrackFillStyle( values ) } />
        );

        const buildHandle = ( val, i ) =>
        {
            let handleClassName = cssMap.handle;
            if ( this.state.inputIndex === i )
            {
                handleClassName = `${cssMap.handle} ${cssMap.handleFocus}`;
            }
            return (
                <div
                    className   = { handleClassName }
                    data-index  = { i }
                    key         = { i } // eslint-disable-line react/no-array-index-key, max-len
                    style       = { this.getHandleStyle( val ) } >
                    <span className = { cssMap.handleLabel }>
                        { val }
                    </span>
                </div>
            );
        };

        const ticksMarkUp = ticks && (
            <div className = { cssMap.ticksContainer }>
                { ticks.map( ( tick, i ) =>
                    ( tick.step !== minValue || tick.step !== maxValue ) &&
                        <div
                            className = { cssMap.tick }
                            key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                            style     = { this.getHandleStyle( tick.step ) }>
                            {tick.stepLabel}
                        </div> ) }
            </div>
        );

        return (
            <div
                className    = { cssMap.main }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut }>
                <div
                    className = { cssMap.inputContainer }
                    ref       = { this.setInputContainerRef }>
                    { values.map( ( val, i ) => (
                        <input
                            data-index  = { i }
                            disabled    = { isDisabled || isReadOnly }
                            id          = { `${id}_${i}` }
                            key         = { i } // eslint-disable-line react/no-array-index-key, max-len
                            max         = { maxValue }
                            min         = { minValue }
                            onBlur      = { this.handleBlur }
                            onChange    = { onChange }
                            onClick     = { onClick }
                            onFocus     = { this.handleFocus }
                            onKeyDown   = { onKeyDown }
                            onKeyUp     = { onKeyUp }
                            onMouseDown = { onMouseDown }
                            onMouseUp   = { onMouseUp }
                            step        = { step }
                            type        = "range"
                            value       = { val } />
                    ) ) }
                </div>

                { sliderLabelMarkUp }

                <div className = { cssMap.trackContainer }>
                    { ( stepLabelsTrack && !stepLabelsTrackEnd ) &&
                        stepLabelsTrack
                    }
                    <div
                        aria-hidden
                        className    = { cssMap.track }
                        onClick      = { this.handleClick }
                        onMouseDown  = { this.handleDown }
                        onTouchStart = { this.handleDown }
                        ref          = { this.setTrackRef }>
                        { trackFillMarkUp }
                        { values.map( buildHandle ) }
                        { ticksMarkUp }
                    </div>
                    { ( stepLabelsTrack && stepLabelsTrackEnd ) &&
                        stepLabelsTrack
                    }
                </div>
            </div>
        );
    }
}
