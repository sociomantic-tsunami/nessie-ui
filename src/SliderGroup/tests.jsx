/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/

import React                      from 'react';
import { shallow, mount }         from 'enzyme';

import { Label, Slider }          from '../index';

import SliderGroup                from './index';


describe( 'SliderGroup', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <SliderGroup /> );
    } );

    it( 'should render <SliderGroup/>', () =>
    {
        expect( Wrapper.find( SliderGroup ) ).to.have.length( 1 );
    } );

    it( 'should have sliderGroup__default as default className', () =>
    {
        expect( Wrapper.find( '.sliderGroup__default' ) ).to.have.length( 1 );
    } );


    it( 'should render all the individual sliders provided', () =>
    {
        const props = {
            sliders : [ { 'value': 50 }, { 'value': 50 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( '.slider__default' ) ).to.have.length( 2 );
    } );

    it( 'should render all the stepLabel labels provided', () =>
    {
        const props = {
            stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', 'step': 25 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = Wrapper.prop( 'cssMap' );

        expect( Wrapper.find( `.${cssMap.stepLabelsContainer}` ).find( Label ) )
            .to.have.length( 2 );
    } );

    it( 'should render all the slider labels provided', () =>
    {
        const props = {
            'sliderLabels' : [ 'category 1', 'category 2', 'category 3', 'category 4' ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        const cssMap = Wrapper.prop( 'cssMap' );

        expect( Wrapper.find( `.${cssMap.sliderLabelContainer}` ).find( Label ) )
            .to.have.length( 4 );
    } );

    it( 'Step labels should pass to the individual Sliders the correct amount of ticks', () =>
    {
        const props = {
            sliders    : [ { 'value': 50 }, { 'value': 50 } ],
            stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', 'step': 25 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( Slider ).first().prop( 'ticks' ) ).to.have.length( 2 );
    } );

    it( 'Individul sliders should ignore label and stepLabel props', () =>
    {
        const props = {
            sliders    : [ { 'value': 50, 'label': 'test', 'stepLabels': [ { 'stepLabel': 25, 'step': 25 }, { 'stepLabel': 50, 'step': 50 }, { 'stepLabel': 75, 'step': 75 } ] }, ],
            stepLabels : [ { 'stepLabel': 'No filter', 'step': 0 }, { 'stepLabel': 'Low', step: 25 } ]
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( Slider ).first().prop( 'label' ) ).to.not.exist;
        expect( Wrapper.find( Slider ).first().prop( 'stepLabels' ) ).to.not.exist;
    } );

    it( 'should have sliderGroup__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        expect( Wrapper.find( '.sliderGroup__disabled' ) ).to.have.length( 1 );
    } );

    it( 'should have sliderGroup__error if hasError = true', () =>
    {
        const props = {
            hasError : true
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( '.sliderGroup__error' ) ).to.have.length( 1 );
    } );

    it( 'SliderGroup should pass down its isReadOnly/isDisabled/hasError prop to the individual sliders if defined', () =>
    {
        const props = {
            sliders    : [ { 'value': 50 }, { 'value': 50 } ],
            isReadOnly : true,
            isDisabled : true,
            hasError   : true,
        };

        Wrapper = mount( <SliderGroup { ...props } /> );

        expect( Wrapper.find( Slider ).first().prop( 'isReadOnly' ) ).to.be.true;
        expect( Wrapper.find( Slider ).first().prop( 'isDisabled' ) ).to.be.true;
        expect( Wrapper.find( Slider ).first().prop( 'hasError' ) ).to.be.true;
    } );

    it( 'SliderGroup should pass down its minValue and maxValue prop to the individual sliders if defined', () =>
    {
        const props = {
            sliders  : [ { 'value': 50, 'minValue': 10, 'maxValue': 90 } ],
            minValue : 0,
            maxValue : 500,
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        expect( Wrapper.find( Slider ).prop( 'minValue' ) ).to.be.equal( 0 );
        expect( Wrapper.find( Slider ).prop( 'maxValue' ) ).to.be.equal( 500 );
    } );

    it( 'Individual sliders should get their orientation = vertical even if the a orientation is individually passed as horizontal in sliders array ', () =>
    {
        const props = {
            sliders : [ { 'value': 50, 'orientation': 'horizontal' } ],
        };

        Wrapper = mount( <SliderGroup { ...props } /> );
        expect( Wrapper.find( Slider ).prop( 'orientation' ) ).to.be.equal( 'vertical' );
    } );

    describe( 'onChange', () =>
    {
        it( 'should be undefined by default', () =>
        {
            const props = {
                sliders : [ { 'value': 50 } ],
            };

            Wrapper = mount( <SliderGroup { ...props } /> );
            expect( Wrapper.prop( 'onChange' ) ).to.be.undefined;
        } );

        it( 'onChange event in individual Sliders should be passed from Sliders array', () =>
        {
            const onChangeSlider = sinon.spy();
            const props = {
                sliders : [ { 'value': 50, 'onChange': onChangeSlider } ],
            };

            Wrapper = shallow( <SliderGroup { ...props } /> );

            const onChange = Wrapper.find( Slider ).simulate( 'change' );

            expect( onChangeSlider.calledOnce ).to.be.true;
        } );

        it( 'Individual slider onChange event should also trigger SldierGroup onchange event if the function is provided in proptype OnChange', () =>
        {
            const onChangeSlider = sinon.spy();
            const onChangeSliderGroup = sinon.spy();
            const props = {
                onChange : onChangeSliderGroup,
                sliders  : [ { 'value': 50, 'onChange': onChangeSlider } ],
            };

            Wrapper = shallow( <SliderGroup { ...props } /> );

            const onChange = Wrapper.find( Slider ).simulate( 'change' );

            expect( onChangeSlider.calledOnce ).to.be.true;
            expect( onChangeSliderGroup.calledOnce ).to.be.true;
        } );
    } );
} );
