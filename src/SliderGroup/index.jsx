/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import { Label, Slider }    from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class SliderGroup extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
        * Individual Slider props
        */
        sliders    : PropTypes.arrayOf( PropTypes.object ),
        /**
        * SliderGroup labels
        */
        stepLabels : PropTypes.arrayOf( PropTypes.shape( {
            stepLabel : PropTypes.string,
            step      : PropTypes.number,
        } ) ),
        /**
        * bototm category labels
        */
        sliderLabels : PropTypes.arrayOf( PropTypes.string ),
        /**
        * Sliders minimum value
        */
        minValue     : PropTypes.number,
        /**
        * Sliders maximum value
        */
        maxValue     : PropTypes.number,
        /**
        *  Display as disabled
        */
        isDisabled   : PropTypes.bool,
        /**
        *  Display as read-only
        */
        isReadOnly   : PropTypes.bool,
        /**
        *  Display as error/invalid
        */
        hasError     : PropTypes.bool,
        /**
        *  onChange callback function : ( e ) => { ... }
        */
        onChange     : PropTypes.func,
    };

    static defaultProps =
    {
        isDisabled : false,
        isReadOnly : false,
        hasError   : false,
        maxValue   : 100,
        minValue   : 0,
    };

    static displayName = 'SliderGroup';

    render()
    {
        const getOffset = ( value, minValue, maxValue ) =>
        {
            if ( minValue >= maxValue || value <= minValue )
            {
                return 0;
            }

            else if ( value >= maxValue )
            {
                return 100;
            }

            const range = maxValue - minValue;
            return ( ( value - minValue ) / range ) * 100;
        };

        const {
            className,
            cssMap = evalTheme( this.context.SliderGroup, this.props ),
            hasError,
            isDisabled,
            isReadOnly,
            sliders = [],
            sliderLabels = [],
            stepLabels = [],
            maxValue,
            minValue,
            onChange,
        } = this.props;

        const ticks = stepLabels.map( label =>
            ( { ...label, stepLabel: '|' } ) );

        const sliderNode = sliders.map( ( slider, i ) =>
        {
            const handleChange = e =>
            {
                if ( slider.onChange )
                {
                    slider.onChange( e );
                }
                if ( onChange )
                {
                    onChange( e );
                }
            };


            return (
                <div
                    key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                    className = { cssMap.sliderWrapper }>
                    <Slider
                        { ...slider }
                        label         = { null }
                        className     = { cssMap.slider }
                        stepLabels    = { null }
                        isDisabled    = { isDisabled || slider.isDisabled }
                        hasError      = { hasError || slider.hasError }
                        maxValue      = { maxValue }
                        minValue      = { minValue }
                        isReadOnly    = { isReadOnly || slider.isReadOnly }
                        ticks         = { ticks }
                        onChange      = { handleChange }
                        orientation   = "vertical" />
                </div>
            );
        } );

        const sliderLabelsNode = sliderLabels.map( ( label, i ) =>
            (
                <div
                    key       = { i } // eslint-disable-line react/no-array-index-key, max-len
                    className = { cssMap.sliderLabelWrapper }>
                    <Label
                        className        = { cssMap.sliderLabel }
                        label            = { label }
                        overflowIsHidden
                    />
                </div>
            ) );

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    error    : !isDisabled && hasError,
                    disabled : isDisabled,

                } ) } >
                { sliders &&
                <div className = { cssMap.flexContainer }>
                    { stepLabels &&
                    <div className = { cssMap.stepLabelsContainer }>
                        { stepLabels.map( ( value, i ) =>
                            <div
                                key       = { i }  // eslint-disable-line react/no-array-index-key, max-len
                                className = { cssMap.labelWrapper }
                                style = { {
                                    bottom :
                                        `${getOffset(
                                            value.step,
                                            minValue,
                                            maxValue,
                                        )}%`,
                                } } >
                                <div
                                    className = { cssMap.stepLabel } >
                                    { value.stepLabel }
                                </div>
                            </div> )}
                    </div>
                    }
                    <div className = { cssMap.slidersContainer }>
                        { sliderNode }
                    </div>
                </div>
                }
                { sliderLabels &&
                <div className = { cssMap.sliderLabelContainer }>
                    { sliderLabelsNode }
                </div>
                }
            </div>
        );
    }
}
