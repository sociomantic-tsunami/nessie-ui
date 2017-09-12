/* global Event addEventListener removeEventListener */

import React                from 'react';
import PropTypes            from 'prop-types';

import Component            from '../proto/Component';
import Css                  from '../hoc/Css';
import IconWithTooltip      from '../IconWithTooltip';
import Label                from '../Label';

export default class Slider extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label                 : PropTypes.string,
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
            'topRight'
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
            'right',
            'bottom',
            'left'
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
            'right',
            'bottom',
            'left'
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
            PropTypes.number,
            PropTypes.arrayOf( PropTypes.number )
        ] ),
        /**
        *  Set the track to use a logarithmic calculated value
        */
        isLogarithmic : PropTypes.bool,
        /**
        * Input onChange callback function
        */
        onChange      : PropTypes.func,
        /**
        * Step labels
        */
        stepLabels    : PropTypes.arrayOf(
            PropTypes.shape( {
                stepLabel : PropTypes.string,
                step      : PropTypes.number,
            } )
        ),
        /**
        * Slider ticks separators
        */
        ticks : PropTypes.arrayOf(
            PropTypes.shape( {
                stepLabel : PropTypes.string,
                step      : PropTypes.number,
            } )
        )
    };

    static defaultProps =
    {
        isDisabled            : false,
        isReadOnly            : false,
        hasError              : false,
        errorMessageIsVisible : false,
        errorMessagePosition  : 'top',
        hasFill               : true,
        fillFrom              : 'start',
        orientation           : 'horizontal',
        stepLabelsPosition    : 'top',
        hasHandleLabels       : false,
        handleLabelPosition   : 'top',
        maxValue              : 100,
        minValue              : 0,
        step                  : 1,
        isLogarithmic         : false,
        cssMap                : require( './slider.css' ),
    };


    constructor( props )
    {
        super( props );

        this.state = { ...this.state, track: {} };

        this.setTrackState = this.setTrackState.bind( this );

        this.handleMouseUp = this.handleMouseUp.bind( this );
        this.handleMouseDown = this.handleMouseDown.bind( this );
        this.handleMouseMove = this.handleMouseMove.bind( this );

        this.getNewValue = this.getNewValue.bind( this );
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
    getNewValue( x, y )
    {
        const { isLogarithmic, orientation, maxValue, minValue } = this.props;
        const { track : { start, end, length } } = this.state;

        const isVertical = orientation === 'vertical';
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

            v = minValue + this.getStep( v - minValue );
            return v;
        }

        // linear solution
        return this.getStep(
            Math.round( ( ( position / length ) * range ) + minValue )
        );
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


    /**
    * Updates state with current track geometry
    * @param {Element}  ref DOM element
    */
    setTrackState( ref )
    {
        if ( ref )
        {
            const isVertical = this.props.orientation === 'vertical';
            const rect = ref.getBoundingClientRect();

            this.setState( {
                track : {
                    start  : isVertical ? rect.top : rect.left,
                    end    : isVertical ? rect.bottom : rect.right,
                    length : isVertical ? rect.height : rect.width
                }
            } );
        }
    }


    /**
    * Updates target input with new value from handle position
    * @param {Event}  event   event being passed
    */
    handleMouseMove( event )
    {
        const { clientX, clientY } = event;
        const { targetInput }      = this.refs;
        const { onChange }         = this.props;
        const e = new Event( 'change' );

        targetInput.value = this.getStep(
            this.getNewValue( clientX, clientY ) );

        targetInput.dispatchEvent( e );
        if ( onChange )
        {
            onChange( e );
        }

        this.forceUpdate();
    }


    /**
    * Sets target input ref and adds mouseUp and MouseMove listeners
    * @param {Event}   event   event being passed
    */
    handleMouseDown( event )
    {
        const { props } = this;
        if ( props.isReadOnly || props.isDisabled )
        {
            return;
        }

        const { refs } = this;

        refs.targetInput = refs[ `input${event.target.dataset.index}` ];
        addEventListener( 'mousemove', this.handleMouseMove );
        addEventListener( 'mouseup', this.handleMouseUp );
    }


    /**
    * Removes mouseMove and mouseUp listeners
    */
    handleMouseUp()
    {
        removeEventListener( 'mousemove', this.handleMouseMove );
        removeEventListener( 'mouseup', this.handleMouseUp );
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
            stepLabels,
            stepLabelStart,
            stepLabelEnd,
            minValue,
            maxValue
        } = this.props;

        if ( stepLabelStart || stepLabelEnd )
        {
            const newStepLabels = [
                { 'stepLabel': stepLabelStart, 'step': minValue },
                ...stepLabels,
                { 'stepLabel': stepLabelEnd, 'step': maxValue }
            ];

            return newStepLabels;
        }

        return stepLabels;
    }


    render()
    {
        const {
            className,
            cssMap,
            errorMessage,
            errorMessageIsVisible,
            errorMessagePosition,
            handleLabelPosition,
            hasError,
            hasFill,
            hasHandleLabels,
            isDisabled,
            isReadOnly,
            label,
            maxValue,
            minValue,
            onChange,
            orientation,
            step,
            stepLabelsPosition,
            value,
            ticks = []
        } = this.props;

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
                        <label
                            key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                            className = { cssMap.stepLabel }
                            style     = { this.getHandleStyle( val.step ) } >
                            { val.stepLabel }
                        </label>
                    ) }
                </div>
            );
        }

        if ( stepLabelsPosition === 'bottom' || stepLabelsPosition === 'right' )
        {
            stepLabelsTrackEnd = true;
        }

        const sliderLabelMarkUp = label && (
            <Label>
                <IconWithTooltip
                    iconType         = "error"
                    iconPosition     = "right"
                    message          = { errorMessage }
                    tooltipIsVisible = { errorMessageIsVisible }
                    tooltipPosition  = { errorMessagePosition }
                    iconIsVisible    = { !!errorMessage && hasError
                        && !isDisabled } >
                    { label }
                </IconWithTooltip>
            </Label>
        );

        const trackFillMarkUp = hasFill && (
            <div
                className = { cssMap.trackFill }
                style     = { this.getTrackFillStyle( values ) } />
        );

        const buildHandle = ( val, i ) =>
            <div
                key         = { i } // eslint-disable-line react/no-array-index-key, max-len
                data-index  = { i }
                className   = { cssMap.handle }
                onMouseDown = { this.handleMouseDown }
                style       = { this.getHandleStyle( val ) } >
                <span className = { cssMap.handleLabel }>
                    { val }
                </span>
            </div>;

        const ticksMarkUp = ticks && (
            <div className = { cssMap.ticksContainer }>
                { ticks.map( ( tick, i ) =>
                    ( tick.step !== minValue || tick.step !== maxValue ) &&
                        <div
                            key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                            className = { cssMap.tick }
                            style     = { this.getHandleStyle( tick.step ) }>
                            {tick.stepLabel}
                        </div>
                 ) }
            </div>
        );

        return (
            <Css
                cssMap = { cssMap }
                cssProps = { {
                    error               : !isDisabled && hasError,
                    disabled            : isDisabled,
                    handleLabelPosition : hasHandleLabels &&
                                          handleLabelPosition,
                    hasHandleLabels,
                    orientation
                } } >
                <div className = { className }>
                    <div className = { cssMap.inputContainer }>
                        { values.map( ( val, i ) => (
                            <input
                                key      = { i } // eslint-disable-line react/no-array-index-key, max-len
                                ref      = { `input${i}` }
                                type     = "range"
                                readOnly = { isReadOnly }
                                disabled = { isDisabled }
                                max      = { maxValue }
                                min      = { minValue }
                                step     = { step }
                                onChange = { onChange }
                                value    = { val } />
                         ) ) }
                    </div>

                    { sliderLabelMarkUp }

                    <div className = { cssMap.trackContainer }>
                        { ( stepLabelsTrack && !stepLabelsTrackEnd ) &&
                                stepLabelsTrack }
                        <div
                            aria-hidden
                            className = { cssMap.track }
                            ref       = { this.setTrackState }>
                            { trackFillMarkUp }

                            { values.map( ( val, i ) =>
                                buildHandle( val, i ) )
                            }

                            { ticksMarkUp }
                        </div>
                        { ( stepLabelsTrack && stepLabelsTrackEnd ) &&
                                stepLabelsTrack }
                    </div>
                </div>
            </Css>
        );
    }
}
