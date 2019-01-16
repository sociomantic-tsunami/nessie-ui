/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import { Label, Slider }    from '../index';

const noop = () => null;


describe( 'Slider', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Slider /> );
        instance = wrapper.instance();
    } );


    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );

    test( 'should contain a “trackFill” div', () =>
    {
        expect( wrapper.find( '.trackFill' ) ).toHaveLength( 1 );
    } );

    test( 'should contain a label if set', () =>
    {
        wrapper.setProps( { label: 'label' } );
        expect( wrapper.find( Label ) ).toHaveLength( 1 );
    } );

    test( 'should contain class slider__stepLabel if stepLabels Array is \
populated', () =>
    {
        wrapper.setProps( {
            stepLabelStart : 'Today',
            stepLabelEnd   : 'Future',
            stepLabels     : [
                { 'stepLabel': '25', 'step': 25 },
                { 'stepLabel': '50', 'step': 50 },
                { 'stepLabel': '75', 'step': 75 },
            ],
        } );

        expect( wrapper.find( '.stepLabel' ) ).toHaveLength( 5 );
    } );

    test( 'should contain N inputs if value is array of length N', () =>
    {
        wrapper.setProps( { value: [ 1 ] } );
        expect( wrapper.find( 'input' ) ).toHaveLength( 1 );

        wrapper.setProps( { value: [ 1, 2, 3 ] } );
        expect( wrapper.find( 'input' ) ).toHaveLength( 3 );
    } );

    test( 'should contain N handle labels if value is array of length N', () =>
    {
        wrapper.setProps( { value: [ 1 ] } );
        expect( wrapper.find( '.handleLabel' ) ).toHaveLength( 1 );

        wrapper.setProps( { value: [ 1, 2, 3 ] } );
        expect( wrapper.find( '.handleLabel' ) ).toHaveLength( 3 );
    } );

    describe( 'getValue()', () =>
    {
        beforeEach( () =>
        {
            instance.track = {
                getBoundingClientRect : () => ( {
                    top    : 0,
                    left   : 0,
                    bottom : 200,
                    right  : 200,
                    width  : 200,
                    height : 200,
                } ),
            };
        } );

        test( 'should return a number', () =>
        {
            expect( instance.getValue( 1, 5 ) ).toBeType( 'number' );
        } );


        test( 'should return a value within min/max values', () =>
        {
            wrapper.setProps( {
                maxValue : 200,
                minValue : 0,
                value    : [ 50, 150 ],
            } );

            expect( instance.getValue( 5, 3 ) ).toBeGreaterThanOrEqual( 0 );
            expect( instance.getValue( 5, 3 ) ).toBeLessThanOrEqual( 200 );
            expect( instance.getValue( 154, 250 ) ).toBe( 154 );
        } );
    } );

    describe( 'handleDown()', () =>
    {
        beforeEach( () =>
        {
            instance.getStep = noop;
            instance.getValue = noop;
            instance.setTargetInput = noop;
            instance.setTargetInputValue = noop;
            instance.focusTargetInput = noop;
        } );

        test( 'should add the mouseup and mousemove event listeners when \
target is handle', () =>
        {
            const addEventListenerSpy =
                jest.spyOn( global, 'addEventListener' );

            const mouseMoveSpy = jest.spyOn( instance, 'handleMove' );
            const mouseUpSpy   = jest.spyOn( instance, 'handleUp' );

            instance.handleDown( {
                target         : { getAttribute: () => 1 }, // first handle
                preventDefault : noop,
            } );

            expect( addEventListenerSpy ).toBeCalledTimes( 2 );
            expect( addEventListenerSpy )
                .toBeCalledWith( 'mousemove', mouseMoveSpy );
            expect( addEventListenerSpy )
                .toBeCalledWith( 'mouseup', mouseUpSpy );
        } );

        test( 'should *not* add the mouseup and mousemove event listeners when \
target is track', () =>
        {
            const addEventListenerSpy =
                jest.spyOn( global, 'addEventListener' ).mockReset();

            instance.handleDown( {
                target         : { getAttribute: () => -1 }, // track
                preventDefault : noop,
            } );

            expect( addEventListenerSpy ).not.toBeCalled();
        } );
    } );

    describe( 'handleUp()', () =>
    {
        test( 'should remove the mouseUp and mouseMove event listeners', () =>
        {
            const { handleUp } = instance;

            const removeEventListenerSpy = jest
                .spyOn( global, 'removeEventListener' );

            const slider = wrapper.instance();

            const mouseMoveSpy = jest.spyOn( slider, 'handleMove' );
            const mouseUpSpy   = jest.spyOn( slider, 'handleUp' );

            handleUp();

            expect( removeEventListenerSpy ).toBeCalledTimes( 2 );
            expect( removeEventListenerSpy )
                .toBeCalledWith( 'mousemove', mouseMoveSpy );
            expect( removeEventListenerSpy )
                .toBeCalledWith( 'mouseup', mouseUpSpy );
        } );

        test( 'should remove touch events', () =>
        {
            const { handleUp } = wrapper.instance();

            const removeEventListenerSpy = jest
                .spyOn( global, 'removeEventListener' ).mockReset();

            const slider = wrapper.instance();

            const mouseMoveSpy = jest.spyOn( slider, 'handleMove' );
            const mouseUpSpy   = jest.spyOn( slider, 'handleUp' );

            handleUp( { type: 'touchend' } );

            expect( removeEventListenerSpy ).toBeCalledTimes( 2 );
            expect( removeEventListenerSpy )
                .toBeCalledWith( 'touchmove', mouseMoveSpy );
            expect( removeEventListenerSpy )
                .toBeCalledWith( 'touchend', mouseUpSpy );
        } );
    } );
} );


describe( 'SliderDriver', () =>
{
    let wrapper;
    let driver;
    let outer;
    let track;
    let inputContainer;

    beforeEach( () =>
    {
        const props = {
            label    : 'Cthulhu',
            maxValue : 200,
            minValue : 0,
            value    : [ 25, 75 ],
        };
        wrapper = mount( <Slider { ...props } /> );
        driver  = wrapper.driver();
        outer   = wrapper.childAt( 0 );
        track   = wrapper.find( '.track' );
        inputContainer = wrapper.find( '.inputContainer' );
    } );

    describe( 'click()', () =>
    {
        let onClick;

        beforeEach( () =>
        {
            onClick = jest.fn();
            wrapper.setProps( { onClick } );
        } );

        test( 'should fire the onClick callback prop exactly once', () =>
        {
            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test(
                'should throw the expected error when slider is disabled',
                () =>
                {
                    wrapper.setProps( { isDisabled: true } );
                    const expectedError = 'Slider \'Cthulhu\' cannot \
onClick since it is disabled';

                    expect( () => driver.click() )
                        .toThrowError( expectedError );
                },
            );

            test( 'should not fire onClick when slider is disabled ', () =>
            {
                wrapper.setProps( { isDisabled: true } );
                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'change( val, index )', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Slider \'Cthulhu\' cannot \
onChange since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isDisabled: true } );

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
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Slider \'Cthulhu\' cannot \
onChange since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isReadOnly: true } );

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


    describe( 'blur( index )', () =>
    {
        let onBlur;

        beforeEach( () =>
        {
            onBlur = jest.fn();
            wrapper.setProps( { onBlur } );
        } );

        test( 'should fire the onBlur callback prop exactly once', () =>
        {
            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );

        test(
            'event target should be the first slider input when no index',
            () =>
            {
                driver.blur();
                const event = onBlur.mock.calls[ 0 ][ 0 ];
                const firstInput = inputContainer.childAt( 0 ).instance();

                expect( event.target ).toBe( firstInput );
            },
        );

        test( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.blur( index );
            const event = onBlur.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).instance();

            expect( event.target ).toBe( input );
        } );


        describe( 'isDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { isDisabled: true } );
            } );

            test( 'should not fire onBlur when slider is disabled ', () =>
            {
                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );

            test(
                'should throw the expected error when slider is disabled',
                () =>
                {
                    const expectedError = 'Slider \'Cthulhu\' cannot \
onBlur since it is disabled';

                    expect( () => driver.blur() ).toThrowError( expectedError );
                },
            );
        } );
    } );


    describe( 'focus( index )', () =>
    {
        let onFocus;

        beforeEach( () =>
        {
            onFocus = jest.fn();
            wrapper.setProps( { onFocus } );
        } );

        test( 'should fire the onFocus callback prop exactly once', () =>
        {
            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );

        test(
            'event target should be the first slider input when no index',
            () =>
            {
                driver.focus();
                const event = onFocus.mock.calls[ 0 ][ 0 ];
                const firstInput = inputContainer.childAt( 0 ).instance();

                expect( event.target ).toBe( firstInput );
            },
        );

        test( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.focus( index );
            const event = onFocus.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).instance();

            expect( event.target ).toBe( input );
        } );


        describe( 'isDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { isDisabled: true } );
            } );

            test( 'should not fire onFocus when slider is disabled ', () =>
            {
                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );

            test(
                'should throw the expected error when slider is disabled',
                () =>
                {
                    const expectedError = 'Slider \'Cthulhu\' cannot \
onFocus since it is disabled';

                    expect( () => driver.focus() )
                        .toThrowError( expectedError );
                },
            );
        } );
    } );


    describe( 'keyDown( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyDown;

        beforeEach( () =>
        {
            onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );
        } );

        test( 'should fire the onKeyDown callback prop exactly once', () =>
        {
            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );

        test( 'should receive keyCode as event keyCode', () =>
        {
            driver.keyDown( keyCode );
            const event = onKeyDown.mock.calls[ 0 ][ 0 ];
            expect( event.keyCode ).toBe( keyCode );
        } );

        test( 'should receive first input as event target when no index', () =>
        {
            driver.keyDown();
            const event = onKeyDown.mock.calls[ 0 ][ 0 ];
            const firstInput = inputContainer.childAt( 0 ).instance();

            expect( event.target ).toBe( firstInput );
        } );

        test( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyDown( null, index );
            const event = onKeyDown.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).instance();

            expect( event.target ).toBe( input );
        } );


        describe( 'isDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { isDisabled: true } );
            } );

            test( 'should not fire onFocus when slider is disabled ', () =>
            {
                try
                {
                    driver.keyDown();
                }
                catch ( error )
                {
                    expect( onKeyDown ).not.toBeCalled();
                }
            } );

            test(
                'should throw the expected error when slider is disabled',
                () =>
                {
                    const expectedError = 'Slider \'Cthulhu\' cannot \
onKeyDown since it is disabled';

                    expect( () => driver.keyDown() )
                        .toThrowError( expectedError );
                },
            );
        } );
    } );


    describe( 'keyUp( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyUp;

        beforeEach( () =>
        {
            onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );
        } );

        test( 'should fire the onKeyUp callback prop exactly once', () =>
        {
            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );

        test( 'should receive keyCode as event keyCode', () =>
        {
            driver.keyUp( keyCode );
            const event = onKeyUp.mock.calls[ 0 ][ 0 ];
            expect( event.keyCode ).toBe( keyCode );
        } );

        test( 'should receive first input as event target when no index', () =>
        {
            driver.keyUp();
            const event = onKeyUp.mock.calls[ 0 ][ 0 ];
            const firstInput = inputContainer.childAt( 0 ).instance();

            expect( event.target ).toBe( firstInput );
        } );

        test( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyUp( null, index );
            const event = onKeyUp.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).instance();

            expect( event.target ).toBe( input );
        } );


        describe( 'isDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { isDisabled: true } );
            } );

            test( 'should not fire onFocus when slider is disabled ', () =>
            {
                try
                {
                    driver.keyUp();
                }
                catch ( error )
                {
                    expect( onKeyUp ).not.toBeCalled();
                }
            } );

            test(
                'should throw the expected error when slider is disabled',
                () =>
                {
                    const expectedError = 'Slider \'Cthulhu\' cannot \
onKeyUp since it is disabled';

                    expect( () => driver.keyUp() )
                        .toThrowError( expectedError );
                },
            );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        let onMouseOut;

        beforeEach( () =>
        {
            onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );
        } );

        test( 'should fire the onMouseOut callback prop exactly once', () =>
        {
            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );

        test( 'should fire onMouseOut with outer wrapper as event target', () =>
        {
            driver.mouseOut();
            const event = onMouseOut.mock.calls[ 0 ][ 0 ];
            expect( event.target ).toBe( outer.instance() );
        } );

        test( 'should still fire onMouseOut when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        let onMouseOver;

        beforeEach( () =>
        {
            onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );
        } );

        test( 'should fire the onMouseOver callback prop exactly once', () =>
        {
            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );

        test(
            'should fire onMouseOver with outer wrapper as event target',
            () =>
            {
                driver.mouseOver();
                const event = onMouseOver.mock.calls[ 0 ][ 0 ];
                expect( event.target ).toBe( outer.instance() );
            },
        );

        test( 'should still fire onMouseOver when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseDown()', () =>
    {
        let onMouseDown;

        beforeEach( () =>
        {
            onMouseDown = jest.fn();
            wrapper.setProps( { onMouseDown } );
        } );

        test( 'should fire the onMouseDown callback prop exactly once', () =>
        {
            driver.mouseDown();
            expect( onMouseDown ).toBeCalledTimes( 1 );
        } );

        test( 'should fire onMouseOver with track as event target', () =>
        {
            driver.mouseDown();
            const event = onMouseDown.mock.calls[ 0 ][ 0 ];
            expect( event.target ).toBe( track.instance() );
        } );

        test( 'should still fire onMouseDown when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseDown();
            expect( onMouseDown ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseUp()', () =>
    {
        test( 'should fire handleUp on the component instance', () =>
        {
            const onMouseUp = jest.fn();
            wrapper.setProps( { onMouseUp } );

            driver.mouseUp();
            expect( onMouseUp ).toBeCalledTimes( 1 );
        } );
    } );
} );
