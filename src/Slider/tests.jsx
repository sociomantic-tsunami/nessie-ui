/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React                      from 'react';
import { mount }                  from 'enzyme';

import Label                      from '../Label/index';

import Slider                     from './index';


describe( 'Slider', () =>
{
    let Wrapper;
    let fakeBoundingRect;

    beforeEach( () =>
{
        Wrapper = mount( <Slider /> );

        fakeBoundingRect = {
            top    : 0,
            left   : 0,
            bottom : 200,
            right  : 200,
            width  : 200,
            height : 200
        };
    } );

    it( 'should have slider__default as default className', () =>
    {
        expect( Wrapper.find( '.slider__default' ) ).to.have.length( 1 );
    } );

    it( 'should render <Slider/>', () =>
    {
        expect( Wrapper.find( Slider ) ).to.have.length( 1 );
    } );

    it( 'should contain <div class="slider__trackFill">', () =>
    {
        Wrapper = mount( <Slider /> );

        expect( Wrapper.find( '.slider__trackFill' ) ).to.have.length( 1 );
    } );

    it( 'should have slider__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__disabled' ) ).to.have.length( 1 );
    } );

    it( 'should have slider__error if hasError = true', () =>
    {
        const props = {
            hasError : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__error' ) ).to.have.length( 1 );
    } );

    it( 'should have slider__hasHandleLabels when hasHandleLabels = true', () =>
    {
        const props = {
            hasHandleLabels : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__hasHandleLabels' ) )
            .to.have.length( 1 );
    } );

    it( 'should contain a label if filled', () =>
    {
        const props = {
            label : 'label'
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( Label ) ).to.have.length( 1 );
    } );

    it( 'should contain class slider__stepLabel if stepLabels Array is \
    populated', () =>
    {
        const props = {
            stepLabelStart : 'Today',
            stepLabelEnd   : 'Future',
            stepLabels     : [   { 'stepLabel': '25', 'step': 25 },
                                { 'stepLabel': '50', 'step': 50 },
                                { 'stepLabel': '75', 'step': 75 }
            ]
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__stepLabel' ) ).to.have.length( 5 );
    } );


    it( 'should contain N inputs if value is array of length N', () =>
    {
        let props = {
            value : [ 1 ]
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( 'input' ) ).to.have.length( 1 );

        props = {
            value : [ 1, 2, 3 ]
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( 'input' ) ).to.have.length( 3 );
    } );

    it( 'should contain N handle labels if value is array of length N', () =>
    {
        let props = {
            value : [ 1 ]
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );

        props = {
            value : [ 1, 2, 3 ]
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 3 );
    } );

    it( 'should set correct position of the handle label', () =>
    {
        let props = {
            value               : [ 1 ],
            handleLabelPosition : 'top',
            hasHandleLabels     : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__top' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'right',
            hasHandleLabels     : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__right' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'bottom',
            hasHandleLabels     : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__bottom' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'left',
            hasHandleLabels     : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__left' ) )
            .to.have.length( 1 );
    } );


    describe( 'getNewValue', () =>
    {
        it( 'should return a number', () =>
        {
            const result = Wrapper.instance().getNewValue( 1, 5 );

            expect( result ).to.be.a.number;
        } );


        it( 'should return a value within min/max values', () =>
        {
            const props = {
                isLogarithmic : false,
                value         : [ 50, 150 ],
                minValue      : 0,
                maxValue      : 200
            };

            Wrapper = mount( <Slider { ...props } /> );

            const slider = Wrapper.instance();

            slider.state = { ...slider.state,
                track : { start: 0, end: 200, length: 200 }
            };

            const getNewValue = Wrapper.instance().getNewValue;
            expect( getNewValue( 5, 3 ) ).to.be.at.least( 0 );
            expect( getNewValue( 5, 3 ) ).to.be.at.most( 200 );
            expect( getNewValue( 154, 250 ) ).to.equal( 154 );
        } );
    } );


    describe( 'handleMouseDown', () =>
    {
        it( 'should be triggered when mousedown in the handle', () =>
        {
            const props = {
                value : 150
            };

            Wrapper = mount( <Slider { ...props } /> );
            const slider = Wrapper.instance();
            const handleMouseDown = sinon.stub( slider, 'handleMouseDown' );

            slider.forceUpdate();
            Wrapper.update();

            Wrapper.find( '.slider__handle' ).simulate( 'mousedown' );

            expect( handleMouseDown.called ).to.be.true;
        } );

        it( 'should trigger addEventListener when mousedown on the handle',
        () =>
        {
            const props = {
                value : [ 50 ]
            };
            Wrapper = mount( <Slider { ...props } /> );

            const eventListenerSpy = sinon.spy( global, 'addEventListener' );

            Wrapper.find( '.slider__handle' ).simulate( 'mousedown' );
            expect( eventListenerSpy.calledTwice ).to.be.true;
            expect( eventListenerSpy.calledWith( 'mousemove' ) ).to.be.true;
            expect( eventListenerSpy.calledWith( 'mouseup' ) ).to.be.true;
        } );
    } );


    describe( 'handleMouseUp', () =>
    {
        it( 'should trigger removeEventListener', () =>
        {
            const handleMouseUp = Wrapper.instance().handleMouseUp;

            const removeEventListenerSpy = sinon.spy(
                global, 'removeEventListener' );

            const slider = Wrapper.instance();

            const mouseMoveSpy = sinon.spy( slider, 'handleMouseMove' );
            const mouseUpSpy   = sinon.spy( slider, 'handleMouseUp' );

            handleMouseUp();

            expect( removeEventListenerSpy.calledTwice ).to.be.true;
            expect( removeEventListenerSpy.calledWith(
                'mousemove', mouseMoveSpy ) ).to.be.true;
            expect( removeEventListenerSpy.calledWith(
                'mouseup', mouseUpSpy ) ).to.be.true;
        } );
    } );
} );
