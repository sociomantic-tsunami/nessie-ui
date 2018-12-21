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

import { Label, Slider }    from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

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
            cssMap = createCssMap( this.context.SliderGroup, this.props ),
            hasError,
            isDisabled,
            isReadOnly,
            maxValue,
            minValue,
            onChange,
            sliderLabels = [],
            sliders = [],
            stepLabels = [],
        } = this.props;

        const ticks = stepLabels.map( label => (
            { ...label, stepLabel: '|' } ) );

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
                    className = { cssMap.sliderWrapper }
                    key       = { i }> // eslint-disable-line react/no-array-index-key, max-len
                    <Slider
                        { ...slider }
                        className     = { cssMap.slider }
                        hasError      = { hasError || slider.hasError }
                        isDisabled    = { isDisabled || slider.isDisabled }
                        isReadOnly    = { isReadOnly || slider.isReadOnly }
                        label         = { null }
                        maxValue      = { maxValue }
                        minValue      = { minValue }
                        onChange      = { handleChange }
                        orientation   = "vertical"
                        stepLabels    = { null }
                        ticks         = { ticks } />
                </div>
            );
        } );

        const sliderLabelsNode = sliderLabels.map( ( label, i ) => (
            <div
                className = { cssMap.sliderLabelWrapper }
                key       = { i }>  // eslint-disable-line react/no-array-index-key, max-len
                <Label
                    className        = { cssMap.sliderLabel }
                    label            = { label }
                    overflowIsHidden
                />
            </div>
        ) );

        return (
            <div className = { cssMap.main }>
                { sliders &&
                    <div className = { cssMap.flexContainer }>
                        { stepLabels &&
                            <div className = { cssMap.stepLabelsContainer }>
                                { stepLabels.map( ( value, i ) =>
                                    <div
                                        className = { cssMap.labelWrapper }
                                        key       = { i }  // eslint-disable-line react/no-array-index-key, max-len
                                        style     = { {
                                            bottom :
                                                `${getOffset(
                                                    maxValue,
                                                    minValue,
                                                    value.step,
                                                )}%`,
                                        } } >
                                        <div className = { cssMap.stepLabel } >
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
