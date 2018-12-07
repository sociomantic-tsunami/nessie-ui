/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                          from 'react';
import { mount }                      from 'enzyme';

import { Label, Slider, SliderGroup } from '../index';
import styles                         from './sliderGroup.css';

describe( 'SliderGroup', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <SliderGroup cssMap = { styles } /> );
    } );

    test( 'should render <SliderGroup/>', () =>
    {
        expect( wrapper.find( SliderGroup ) ).toHaveLength( 1 );
    } );

    test( 'should have sliderGroup__default as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );


    test( 'should render all the individual sliders provided', () =>
    {
        const props = {
            sliders : [
                { 'value': 50 },
                { 'value': 80 },
            ],
        };

        wrapper = mount( <SliderGroup { ...props } /> );

        expect( wrapper.find( 'Slider' )
            .find( `.${wrapper.prop( 'cssMap' ).default}` ) ).toHaveLength( 2 );
    } );

    test( 'should render all the stepLabel labels provided', () =>
    {
        const props = {
            stepLabels : [
                { 'stepLabel': 'No filter', 'step': 0 },
                { 'stepLabel': 'Low', 'step': 25 },
            ],
        };

        wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = wrapper.prop( 'cssMap' );

        expect( wrapper.find( `.${cssMap.stepLabelsContainer}` )
            .children() ).toHaveLength( 2 );
    } );

    test( 'should render all the slider labels provided', () =>
    {
        const props = {
            'sliderLabels' : [
                'category 1',
                'category 2',
                'category 3',
                'category 4',
            ],
        };

        wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = wrapper.prop( 'cssMap' );

        expect( wrapper.find( `.${cssMap.sliderLabelContainer}` )
            .find( Label ) ).toHaveLength( 4 );
    } );

    test(
        'Step labels should pass to the individual Sliders the correct amount \
of ticks',
        () =>
        {
            const props = {
                sliders : [
                    { 'value': 50 },
                    { 'value': 50 },
                ],
                stepLabels : [
                    {
                        'stepLabel' : 'No filter',
                        'step'      : 0,
                    },
                    {
                        'stepLabel' : 'Low',
                        'step'      : 25,
                    },
                ],
            };

            wrapper = mount( <SliderGroup { ...props } /> );

            expect( wrapper.find( Slider ).first().prop( 'ticks' ) )
                .toHaveLength( 2 );
        },
    );

    test( 'Individul sliders should ignore label and stepLabel props', () =>
    {
        const props = {
            sliders : [
                {
                    'value'      : 50,
                    'label'      : 'test',
                    'stepLabels' : [
                        { 'stepLabel': 25, 'step': 25 },
                        { 'stepLabel': 50, 'step': 50 },
                        { 'stepLabel': 75, 'step': 75 },
                    ],
                },
            ],
            stepLabels : [
                {
                    'stepLabel' : 'No filter',
                    'step'      : 0,
                },
                {
                    'stepLabel' : 'Low',
                    step        : 25,
                },
            ],
        };

        wrapper = mount( <SliderGroup { ...props } /> );

        expect( wrapper.find( Slider ).first().prop( 'label' ) ).toBeFalsy();
        expect( wrapper.find( Slider ).first().prop( 'stepLabels' ) )
            .toBeFalsy();
    } );

    test( 'should have sliderGroup__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true,
        };

        wrapper = mount( <SliderGroup { ...props } /> );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).disabled}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have sliderGroup__error if hasError = true', () =>
    {
        const props = {
            hasError : true,
        };

        wrapper = mount( <SliderGroup { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).error}` ) )
            .toHaveLength( 1 );
    } );

    test(
        'SliderGroup should pass down its isReadOnly/isDisabled/hasError prop \
to the individual sliders if defined',
        () =>
        {
            const props = {
                sliders    : [ { 'value': 50 }, { 'value': 50 } ],
                isReadOnly : true,
                isDisabled : true,
                hasError   : true,
            };

            wrapper = mount( <SliderGroup { ...props } /> );

            expect( wrapper.find( Slider ).first().prop( 'isReadOnly' ) )
                .toBeTruthy();
            expect( wrapper.find( Slider ).first().prop( 'isDisabled' ) )
                .toBeTruthy();
            expect( wrapper.find( Slider ).first().prop( 'hasError' ) )
                .toBeTruthy();
        },
    );

    test(
        'SliderGroup should pass down its minValue and maxValue prop to the \
individual sliders if defined',
        () =>
        {
            const props = {
                sliders  : [ { 'value': 50, 'minValue': 10, 'maxValue': 90 } ],
                minValue : 0,
                maxValue : 500,
            };

            wrapper = mount( <SliderGroup { ...props } /> );
            expect( wrapper.find( Slider ).prop( 'minValue' ) ).toBe( 0 );
            expect( wrapper.find( Slider ).prop( 'maxValue' ) ).toBe( 500 );
        },
    );

    test(
        'Individual sliders should get their orientation = vertical even if \
the a orientation is individually passed as horizontal in sliders array ',
        () =>
        {
            const props = {
                sliders : [ { 'value': 50, 'orientation': 'horizontal' } ],
            };

            wrapper = mount( <SliderGroup { ...props } /> );
            expect( wrapper.find( Slider ).prop( 'orientation' ) )
                .toBe( 'vertical' );
        },
    );

    describe( 'onChange', () =>
    {
        test( 'should be undefined by default', () =>
        {
            const props = {
                sliders : [ { 'value': 50 } ],
            };

            wrapper = mount( <SliderGroup { ...props } /> );
            expect( wrapper.prop( 'onChange' ) ).toBeUndefined();
        } );
    } );
} );

describe( 'SliderGroupDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <SliderGroup cssMap = { styles } /> );
        driver  = wrapper.driver();
    } );

    describe( 'change( val, index )', () =>
    {
        test( 'should trigger onChange in individual Slider', () =>
        {
            const onChangeSlider = jest.fn();
            wrapper.setProps( {
                sliders : [ { 'value': 50, 'onChange': onChangeSlider } ],
            } );

            driver.change();

            expect( onChangeSlider ).toBeCalledTimes( 1 );
        } );

        test(
            'Individual slider onChange event should also trigger SliderGroup \
onChange event if the function is provided in proptype OnChange',
            () =>
            {
                const onChangeSlider = jest.fn();
                const onChangeSliderGroup = jest.fn();
                wrapper.setProps( {
                    onChange : onChangeSliderGroup,
                    sliders  : [ { 'value': 50, 'onChange': onChangeSlider } ],
                } );

                driver.change();

                expect( onChangeSlider ).toBeCalledTimes( 1 );
                expect( onChangeSliderGroup ).toBeCalledTimes( 1 );
            },
        );


        describe( 'isDisabled', () =>
        {
            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isDisabled : true,
                    sliders    : [ {
                        'value' : 50,
                        'label' : 'Cthulhu',
                    } ],
                } );

                try
                {
                    driver.change();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isReadOnly : true,
                    sliders    : [ {
                        'value' : 50,
                        'label' : 'Cthulhu',
                    } ],
                } );

                try
                {
                    driver.change();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
