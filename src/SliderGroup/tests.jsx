/* global test jest */
/* eslint-disable max-len */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import { Label, Slider }  from '../index';

import SliderGroup        from './index';


describe( 'SliderGroup', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <SliderGroup /> );
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
                { 'value': 80 }
            ]
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
                { 'stepLabel': 'Low', 'step': 25 }
            ]
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
                'category 4'
            ]
        };

        wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = wrapper.prop( 'cssMap' );

        expect( wrapper.find( `.${cssMap.sliderLabelContainer}` )
            .find( Label ) ).toHaveLength( 4 );
    } );

    test(
        'Step labels should pass to the individual Sliders the correct amount of ticks',
        () =>
        {
            const props = {
                sliders : [
                    { 'value': 50 },
                    { 'value': 50 }
                ],
                stepLabels : [
                    {
                        'stepLabel' : 'No filter',
                        'step'      : 0
                    },
                    {
                        'stepLabel' : 'Low',
                        'step'      : 25
                    }
                ]
            };

            wrapper = mount( <SliderGroup { ...props } /> );

            expect( wrapper.find( Slider ).first().prop( 'ticks' ) )
                .toHaveLength( 2 );
        }
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
                        { 'stepLabel': 75, 'step': 75 }
                    ]
                },
            ],
            stepLabels : [
                {
                    'stepLabel' : 'No filter',
                    'step'      : 0
                },
                {
                    'stepLabel' : 'Low',
                    step        : 25
                }
            ]
        };

        wrapper = mount( <SliderGroup { ...props } /> );

        expect( wrapper.find( Slider ).first().prop( 'label' ) ).toBeFalsy();
        expect( wrapper.find( Slider ).first().prop( 'stepLabels' ) )
            .toBeFalsy();
    } );

    test( 'should have sliderGroup__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true
        };

        wrapper = mount( <SliderGroup { ...props } /> );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).disabled}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have sliderGroup__error if hasError = true', () =>
    {
        const props = {
            hasError : true
        };

        wrapper = mount( <SliderGroup { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).error}` ) )
            .toHaveLength( 1 );
    } );

    test(
        'SliderGroup should pass down its isReadOnly/isDisabled/hasError prop to the individual sliders if defined',
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
        }
    );

    test(
        'SliderGroup should pass down its minValue and maxValue prop to the individual sliders if defined',
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
        }
    );

    test(
        'Individual sliders should get their orientation = vertical even if the a orientation is individually passed as horizontal in sliders array ',
        () =>
        {
            const props = {
                sliders : [ { 'value': 50, 'orientation': 'horizontal' } ],
            };

            wrapper = mount( <SliderGroup { ...props } /> );
            expect( wrapper.find( Slider ).prop( 'orientation' ) )
                .toBe( 'vertical' );
        }
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

        test(
            'onChange event in individual Sliders should be passed from Sliders array',
            () =>
            {
                const onChangeSlider = jest.fn();
                const props = {
                    sliders : [ { 'value': 50, 'onChange': onChangeSlider } ],
                };

                wrapper = shallow( <SliderGroup { ...props } /> );

                wrapper.find( Slider ).simulate( 'change' );

                expect( onChangeSlider ).toBeCalled();
            }
        );

        test(
            'Individual slider onChange event should also trigger SliderGroup onChange event if the function is provided in proptype OnChange',
            () =>
            {
                const onChangeSlider = jest.fn();
                const onChangeSliderGroup = jest.fn();
                const props = {
                    onChange : onChangeSliderGroup,
                    sliders  : [ { 'value': 50, 'onChange': onChangeSlider } ],
                };

                wrapper = shallow( <SliderGroup { ...props } /> );

                wrapper.find( Slider ).simulate( 'change' );

                expect( onChangeSlider ).toBeCalled();
                expect( onChangeSliderGroup ).toBeCalled();
            }
        );
    } );
} );

describe( 'SliderGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <SliderGroup /> );
    } );

    describe( 'getSlider()', () =>
    {
        test( 'should get Slider at given index', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 50 },
                    { value: 80 },
                    { value: 60 },
                    { value: 70 }
                ],
            } );

            expect( wrapper.driver().getSlider( 1 ).prop( 'value' ) ).toBe( 80 );
        } );

        test( 'should get Sliders when indexes are passed as an array', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 50 },
                    { value: 80 },
                    { value: 60 },
                    { value: 70 }
                ],
            } );

            expect( wrapper.driver().getSlider( [ 0, 2 ] ) ).toHaveLength( 2 );
        } );

        test( 'should return a Slider at certain index in array', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 40 },
                    { value: 20 },
                    { value: 10 },
                    { value: 30 }
                ],
            } );

            expect( wrapper.driver().getSlider( [ 1, 3 ] )[ 0 ].prop( 'value' ) )
                .toBe( 20 );
        } );
    } );
} );
