/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable max-len */

import React                      from 'react';
import { shallow, mount }         from 'enzyme';

import { Label, Slider }          from '../index';

import SliderGroup                from './index';


describe( 'SliderGroup', () =>
{
    let Wrapper;

    beforeEach(() =>
    {
        Wrapper = mount( <SliderGroup /> );
    });

    test('should render <SliderGroup/>', () =>
    {
        expect( Wrapper.find( SliderGroup ) ).toHaveLength(1);
    });

    test('should have sliderGroup__default as default className', () =>
    {
        expect( Wrapper.find( '.sliderGroup__default' ) ).toHaveLength(1);
    });


    test('should render all the individual sliders provided', () =>
    {
        const props = {
            sliders : [ { 'value': 50 }, { 'value': 50 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( '.slider__default' ) ).toHaveLength(2);
    });

    test('should render all the stepLabel labels provided', () =>
    {
        const props = {
            stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', 'step': 25 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = Wrapper.prop( 'cssMap' );

        expect( Wrapper.find( `.${cssMap.stepLabelsContainer}` ).find( Label ) ).toHaveLength(2);
    });

    test('should render all the slider labels provided', () =>
    {
        const props = {
            'sliderLabels' : [ 'category 1', 'category 2', 'category 3', 'category 4' ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = Wrapper.prop( 'cssMap' );

        expect( Wrapper.find( `.${cssMap.sliderLabelContainer}` ).find( Label ) ).toHaveLength(4);
    });

    test(
        'Step labels should pass to the individual Sliders the correct amount of ticks',
        () =>
        {
            const props = {
                sliders    : [ { 'value': 50 }, { 'value': 50 } ],
                stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', 'step': 25 } ]
            };

            Wrapper = mount( <SliderGroup { ...props } /> );

            expect( Wrapper.find( Slider ).first().prop( 'ticks' ) ).toHaveLength(2);
        }
    );

    test('Individul sliders should ignore label and stepLabel props', () =>
    {
        const props = {
            sliders    : [ { 'value': 50, 'label': 'test', 'stepLabels': [ { 'stepLabel': 25, 'step': 25 }, { 'stepLabel': 50, 'step': 50 }, { 'stepLabel': 75, 'step': 75 } ] }, ],
            stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', step: 25 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( Slider ).first().prop( 'label' ) ).toBeFalsy();
        expect( Wrapper.find( Slider ).first().prop( 'stepLabels' ) ).toBeFalsy();
    });

    test('should have sliderGroup__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        expect( Wrapper.find( '.sliderGroup__disabled' ) ).toHaveLength(1);
    });

    test('should have sliderGroup__error if hasError = true', () =>
    {
        const props = {
            hasError : true
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( '.sliderGroup__error' ) ).toHaveLength(1);
    });

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

            Wrapper = mount( <SliderGroup { ...props } /> );

            expect( Wrapper.find( Slider ).first().prop( 'isReadOnly' ) ).toBe(true);
            expect( Wrapper.find( Slider ).first().prop( 'isDisabled' ) ).toBe(true);
            expect( Wrapper.find( Slider ).first().prop( 'hasError' ) ).toBe(true);
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

            Wrapper = mount( <SliderGroup { ...props } /> );
            expect( Wrapper.find( Slider ).prop( 'minValue' ) ).toBe(0);
            expect( Wrapper.find( Slider ).prop( 'maxValue' ) ).toBe(500);
        }
    );

    test(
        'Individual sliders should get their orientation = vertical even if the a orientation is individually passed as horizontal in sliders array ',
        () =>
        {
            const props = {
                sliders : [ { 'value': 50, 'orientation': 'horizontal' } ],
            };

            Wrapper = mount( <SliderGroup { ...props } /> );
            expect( Wrapper.find( Slider ).prop( 'orientation' ) ).toBe('vertical');
        }
    );

    describe( 'onChange', () =>
    {
        test('should be undefined by default', () =>
        {
            const props = {
                sliders : [ { 'value': 50 } ],
            };

            Wrapper = mount( <SliderGroup { ...props } /> );
            expect( Wrapper.prop( 'onChange' ) ).toBeUndefined();
        });

        test(
            'onChange event in individual Sliders should be passed from Sliders array',
            () =>
            {
                const onChangeSlider = sinon.spy();
                const props = {
                    sliders : [ { 'value': 50, 'onChange': onChangeSlider } ],
                };

                Wrapper = shallow( <SliderGroup { ...props } /> );

                Wrapper.find( Slider ).simulate( 'change' );

                expect( onChangeSlider.calledOnce ).toBe(true);
            }
        );

        test(
            'Individual slider onChange event should also trigger SliderGroup onChange event if the function is provided in proptype OnChange',
            () =>
            {
                const onChangeSlider = sinon.spy();
                const onChangeSliderGroup = sinon.spy();
                const props = {
                    onChange : onChangeSliderGroup,
                    sliders  : [ { 'value': 50, 'onChange': onChangeSlider } ],
                };

                Wrapper = shallow( <SliderGroup { ...props } /> );

                Wrapper.find( Slider ).simulate( 'change' );

                expect( onChangeSlider.calledOnce ).toBe(true);
                expect( onChangeSliderGroup.calledOnce ).toBe(true);
            }
        );
    } );
} );

describe( 'SliderGroupDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <SliderGroup /> );
    });

    describe( 'getSlider()', () =>
    {
        test('should get Slider at given index', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 50 },
                    { value: 80 },
                    { value: 60 },
                    { value: 70 }
                ],
            } );

            expect( wrapper.driver().getSlider( 1 ).props().value ).toBe(80);
        });

        test('should get Sliders when indexes are passed as an array', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 50 },
                    { value: 80 },
                    { value: 60 },
                    { value: 70 }
                ],
            } );

            expect( wrapper.driver().getSlider( [ 0, 2 ] ) ).toHaveLength(2);
        });

        test('should return a Slider at certain index in array', () =>
        {
            wrapper.setProps( {
                sliders : [
                    { value: 40 },
                    { value: 20 },
                    { value: 10 },
                    { value: 30 }
                ],
            } );

            expect( wrapper.driver().getSlider( [ 1, 3 ] )[ 0 ].props().value ).toBe(20);
        });
    } );
} );
