/* eslint-env node, mocha */
/* global expect */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React                      from 'react';
import { mount }                  from 'enzyme';

import Label                      from '../Label/index';

import Slider                     from './index';

const noop = () => null;

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
            value    : [ 1 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );


        expect( Wrapper.find( 'input' ) ).to.have.length( 1 );

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( 'input' ) ).to.have.length( 3 );
    } );

    it( 'should contain N handle labels if value is array of length N', () =>
    {
        let props = {
            value    : [ 1 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );


        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 3 );
    } );

    it( 'should set correct position of the handle label', () =>
    {
        let props = {
            value               : [ 1 ],
            handleLabelPosition : 'top',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__top' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'right',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__right' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'bottom',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__bottom' ) )
            .to.have.length( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'left',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).to.have.length( 1 );
        expect( Wrapper.find( '.slider__handleLabelPosition__left' ) )
            .to.have.length( 1 );
    } );


    describe( 'getValue', () =>
    {
        it( 'should return a number', () =>
        {
            const result = Wrapper.instance().getValue( 1, 5 );

            expect( result ).to.be.a.number;
        } );


        it( 'should return a value within min/max values', () =>
        {
            const props = {
                isLogarithmic : false,
                value         : [ 50, 150 ],
                minValue      : 0,
                maxValue      : 200,
                onChange      : noop
            };

            Wrapper = mount( <Slider { ...props } /> );

            const slider   = Wrapper.instance();

            sinon.stub( slider.track, 'getBoundingClientRect' )
                .callsFake( () => ( fakeBoundingRect ) );

            expect( Wrapper.instance().getValue( 5, 3 ) ).to.be.at.least( 0 );
            expect( Wrapper.instance().getValue( 5, 3 ) ).to.be.at.most( 200 );
            expect( Wrapper.instance().getValue( 154, 250 ) ).to.equal( 154 );
        } );
    } );


    describe( 'handleMouseDown', () =>
    {
        it( 'should be triggered when mousedown in the handle', () =>
        {
            const props = {
                value    : 150,
                onChange : noop
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
                    value    : [ 50 ],
                    onChange : noop
                };
                Wrapper = mount( <Slider { ...props } /> );

                const eventListenerSpy =
                    sinon.spy( global, 'addEventListener' );

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


describe.only( 'SliderDriver', () =>
{
    let wrapper;
    let driver;
    let cssMap;
    let inputContainer;

    beforeEach( () =>
    {
        const props = {
            label    : 'Pikaboo',
            maxValue : 200,
            minValue : 0,
            value    : [ 25, 75 ],
        };

        wrapper = mount( <Slider { ...props } /> );
        driver  = wrapper.driver();
        cssMap  = wrapper.prop( 'cssMap' );
        inputContainer = wrapper.find( `.${cssMap.inputContainer}` );
    } );

    describe( 'click()', () =>
    {
        let clickSpy;

        beforeEach( () =>
        {
            clickSpy = sinon.spy();
            wrapper.setProps( { onClick: clickSpy } );
        } );

        it( 'should fire the onClick callback prop exactly once', () =>
        {
            driver.click();
            expect( clickSpy.calledOnce ).to.be.true;
        } );

        it( 'should not fire onClick when slider is disabled ', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( () => driver.click() ).to.throw;
            expect( clickSpy.notCalled ).to.be.true;
        } );

        it( 'should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).to.throw( expectedError );
        } );
    } );

    describe( 'blur( index )', () =>
    {
        let onBlur;

        beforeEach( () =>
        {
            onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );
        } );

        it( 'should fire the onBlur callback prop exactly once', () =>
        {
            driver.blur();
            expect( onBlur.calledOnce ).to.be.true;
        } );

        it( 'event target should be the first slider input when no index', () =>
        {
            driver.blur();
            const event = onBlur.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).to.equal( firstInput );
        } );

        it( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.blur( index );
            const event = onBlur.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).to.equal( input );
        } );

        it( 'should not fire onBlur when slider is disabled ', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( () => driver.click() ).to.throw;
            expect( onBlur.notCalled ).to.be.true;
        } );

        it( 'should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be blurred since it is disabled';

            expect( () => driver.blur() ).to.throw( expectedError );
        } );
    } );

    describe( 'focus( index )', () =>
    {
        let onFocus;

        beforeEach( () =>
        {
            onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );
        } );

        it( 'should fire the onFocus callback prop exactly once', () =>
        {
            driver.focus();
            expect( onFocus.calledOnce ).to.be.true;
        } );

        it( 'event target should be the first slider input when no index', () =>
        {
            driver.focus();
            const event = onFocus.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).to.equal( firstInput );
        } );

        it( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.focus( index );
            const event = onFocus.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).to.equal( input );
        } );
    } );

    describe( 'keyDown( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyDown;

        beforeEach( () =>
        {
            onKeyDown = sinon.spy();
            wrapper.setProps( { onKeyDown } );
        } );

        it( 'should fire the onKeyDown callback prop exactly once', () =>
        {
            driver.keyDown();
            expect( onKeyDown.calledOnce ).to.be.true;
        } );

        it( 'should receive keyCode as event keyCode', () =>
        {
            driver.keyDown( keyCode );
            const event = onKeyDown.lastCall.args[ 0 ];
            expect( event.keyCode ).to.equal( keyCode );
        } );

        it( 'should receive first input as event target when no index', () =>
        {
            driver.keyDown();
            const event = onKeyDown.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).to.equal( firstInput );
        } );

        it( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyDown( null, index );
            const event = onKeyDown.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).to.equal( input );
        } );
    } );

    describe( 'keyUp( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyUp;

        beforeEach( () =>
        {
            onKeyUp = sinon.spy();
            wrapper.setProps( { onKeyUp } );
        } );

        it( 'should fire the onKeyUp callback prop exactly once', () =>
        {
            driver.keyUp();
            expect( onKeyUp.calledOnce ).to.be.true;
        } );

        it( 'should receive keyCode as event keyCode', () =>
        {
            driver.keyUp( keyCode );
            const event = onKeyUp.lastCall.args[ 0 ];
            expect( event.keyCode ).to.equal( keyCode );
        } );

        it( 'should receive first input as event target when no index', () =>
        {
            driver.keyUp();
            const event = onKeyUp.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).to.equal( firstInput );
        } );

        it( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyUp( null, index );
            const event = onKeyUp.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).to.equal( input );
        } );
    } );

    describe( 'setInputValue( value, index )', () =>
    {
        let mouseDown;
        let change;

        beforeEach( () =>
        {
            mouseDown = sinon.spy( driver, 'mouseDown' );
            change    = sinon.spy( driver, 'change' );
        } );

        it( 'should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be changed since it is disabled';

            expect( () => driver.setInputValue() ).to.throw( expectedError );
        } );

        it( 'should call the change method exactly once if single value', () =>
        {
            const value = 20;
            driver.setInputValue( value );
            expect( change.calledOnce ).to.be.true;
        } );

        it( 'should call change method once per value if array of values', () =>
        {
            const value = [ 10, 20 ];
            driver.setInputValue( value );
            expect( change.calledTwice ).to.be.true;
        } );

        it( 'should call change with value and index for each array value', () =>
        {
            const value = [ 10, 20 ];
            driver.setInputValue( value );

            value.forEach( ( value, i ) =>
                expect( change.getCalls()[ i ].args ).to.eql( [ value, i ] )
            );
        } );
    } );
} );
