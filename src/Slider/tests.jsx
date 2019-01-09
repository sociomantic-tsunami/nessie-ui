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
import { mount }            from 'enzyme';

import { Label, Slider }    from '../index';

const noop = () => null;

describe( 'Slider', () =>
{
    let wrapper;
    let fakeBoundingRect;

    beforeEach( () =>
    {
        wrapper = mount( <Slider /> );

        fakeBoundingRect = {
            top    : 0,
            left   : 0,
            bottom : 200,
            right  : 200,
            width  : 200,
            height : 200,
        };
    } );

    test( 'should have slider__default as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should render <Slider/>', () =>
    {
        expect( wrapper.find( Slider ) ).toHaveLength( 1 );
    } );

    test( 'should contain <div class="slider__trackFill">', () =>
    {
        wrapper = mount( <Slider /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).trackFill}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have slider__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).disabled}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have slider__error if hasError = true', () =>
    {
        const props = {
            hasError : true,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).error}` ) )
            .toHaveLength( 1 );
    } );

    test(
        'should have slider__hasHandleLabels when hasHandleLabels = true',
        () =>
        {
            const props = {
                hasHandleLabels : true,
            };

            wrapper = mount( <Slider { ...props } /> );

            expect( wrapper.find( `.${wrapper.prop( 'cssMap' )
                .hasHandleLabels}` ) ).toHaveLength( 1 );
        },
    );

    test( 'should contain a label if filled', () =>
    {
        const props = {
            label : 'label',
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( Label ) ).toHaveLength( 1 );
    } );

    test( 'should contain class slider__stepLabel if stepLabels Array is \
    populated', () =>
    {
        const props = {
            stepLabelStart : 'Today',
            stepLabelEnd   : 'Future',
            stepLabels     : [   { 'stepLabel': '25', 'step': 25 },
                { 'stepLabel': '50', 'step': 50 },
                { 'stepLabel': '75', 'step': 75 },
            ],
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).stepLabel}` ) )
            .toHaveLength( 5 );
    } );


    test( 'should contain N inputs if value is array of length N', () =>
    {
        let props = {
            value    : [ 1 ],
            onChange : noop,
        };

        wrapper = mount( <Slider { ...props } /> );


        expect( wrapper.find( 'input' ) ).toHaveLength( 1 );

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( 'input' ) ).toHaveLength( 3 );
    } );

    test( 'should contain N handle labels if value is array of length N', () =>
    {
        let props = {
            value    : [ 1 ],
            onChange : noop,
        };

        wrapper = mount( <Slider { ...props } /> );


        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 1 );

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 3 );
    } );

    test( 'should set correct position of the handle label', () =>
    {
        let props = {
            value               : [ 1 ],
            handleLabelPosition : 'top',
            hasHandleLabels     : true,
            onChange            : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 1 );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' )
            .handleLabelPosition__top}` ) ).toHaveLength( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'right',
            hasHandleLabels     : true,
            onChange            : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 1 );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' )
            .handleLabelPosition__right}` ) ).toHaveLength( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'bottom',
            hasHandleLabels     : true,
            onChange            : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 1 );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' )
            .handleLabelPosition__bottom}` ) ).toHaveLength( 1 );

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'left',
            hasHandleLabels     : true,
            onChange            : noop,
        };

        wrapper = mount( <Slider { ...props } /> );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).handleLabel}` ) )
            .toHaveLength( 1 );
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' )
            .handleLabelPosition__left}` ) ).toHaveLength( 1 );
    } );


    describe( 'getValue', () =>
    {
        test( 'should return a number', () =>
        {
            const result = wrapper.instance().getValue( 1, 5 );

            expect( result ).toBeType( 'number' );
        } );


        test( 'should return a value within min/max values', () =>
        {
            const props = {
                isLogarithmic : false,
                value         : [ 50, 150 ],
                minValue      : 0,
                maxValue      : 200,
                onChange      : noop,
            };

            wrapper = mount( <Slider { ...props } /> );

            const slider = wrapper.instance();
            slider.track.getBoundingClientRect = () => ( fakeBoundingRect );

            expect( wrapper.instance().getValue( 5, 3 ) )
                .toBeGreaterThanOrEqual( 0 );
            expect( wrapper.instance().getValue( 5, 3 ) )
                .toBeLessThanOrEqual( 200 );
            expect( wrapper.instance().getValue( 154, 250 ) ).toBe( 154 );
        } );
    } );


    describe( 'handleDown', () =>
    {
        test( 'should be triggered when mousedown in the handle', () =>
        {
            const props = {
                value    : 150,
                onChange : noop,
            };

            wrapper = mount( <Slider { ...props } /> );
            const slider = wrapper.instance();
            const handleDown = jest.spyOn( slider, 'handleDown' );

            slider.forceUpdate();
            wrapper.update();

            wrapper.find( `.${wrapper.prop( 'cssMap' ).handle}` )
                .simulate( 'mousedown' );

            expect( handleDown ).toBeCalled();
        } );

        test(
            'should trigger addEventListener when mousedown on the handle',
            () =>
            {
                const props = {
                    value    : [ 50 ],
                    onChange : noop,
                };
                wrapper = mount( <Slider { ...props } /> );

                const eventListenerSpy = jest
                    .spyOn( global, 'addEventListener' );

                const slider = wrapper.instance();

                const mouseMoveSpy = jest.spyOn( slider, 'handleMove' );
                const mouseUpSpy   = jest.spyOn( slider, 'handleUp' );

                wrapper.find( `.${wrapper.prop( 'cssMap' ).handle}` )
                    .simulate( 'mousedown' );
                expect( eventListenerSpy ).toBeCalledTimes( 2 );
                expect( eventListenerSpy )
                    .toBeCalledWith( 'mousemove', mouseMoveSpy );
                expect( eventListenerSpy )
                    .toBeCalledWith( 'mouseup', mouseUpSpy );
            },
        );
    } );


    describe( 'handleUp', () =>
    {
        test( 'should trigger removeEventListener', () =>
        {
            const { handleUp } = wrapper.instance();

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
    let cssMap;
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
        cssMap  = wrapper.prop( 'cssMap' );
        outer   = wrapper.find( `.${cssMap.default}` ).first();
        track   = wrapper.find( `.${cssMap.track}` );
        inputContainer = wrapper.find( `.${cssMap.inputContainer}` );
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


    describe( 'change( val, index = 0 )', () =>
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
                const firstInput = inputContainer.childAt( 0 ).node;

                expect( event.target ).toBe( firstInput );
            },
        );

        test( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.blur( index );
            const event = onBlur.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).node;

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
                const firstInput = inputContainer.childAt( 0 ).node;

                expect( event.target ).toBe( firstInput );
            },
        );

        test( 'event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.focus( index );
            const event = onFocus.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).node;

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
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe( firstInput );
        } );

        test( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyDown( null, index );
            const event = onKeyDown.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).node;

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
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe( firstInput );
        } );

        test( 'should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyUp( null, index );
            const event = onKeyUp.mock.calls[ 0 ][ 0 ];
            const input = inputContainer.childAt( index ).node;

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
            expect( event.target ).toBe( outer.getNode() );
        } );

        test( 'should still fire onMouseOut when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOut();
            expect( onMouseOut ).toBeCalled();
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
                expect( event.target ).toBe( outer.getNode() );
            },
        );

        test( 'should still fire onMouseOver when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOver();
            expect( onMouseOver ).toBeCalled();
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
            expect( event.target ).toBe( track.getNode() );
        } );

        test( 'should still fire onMouseDown when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseDown();
            expect( onMouseDown ).toBeCalled();
        } );
    } );


    describe( 'mouseUp()', () =>
    {
        let handleUp;

        beforeEach( () =>
        {
            handleUp = jest.fn( wrapper.node, 'handleUp' );
        } );

        test( 'should fire handleUp on the component instance', () =>
        {
            handleUp = jest.fn();
            wrapper.setProps( { onMouseUp: handleUp } );

            driver.mouseUp();
            expect( handleUp ).toBeCalled();
        } );
    } );
} );
