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

    beforeEach(() =>
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
    });

    test('should have slider__default as default className', () =>
    {
        expect( Wrapper.find( '.slider__default' ) ).toHaveLength(1);
    });

    test('should render <Slider/>', () =>
    {
        expect( Wrapper.find( Slider ) ).toHaveLength(1);
    });

    test('should contain <div class="slider__trackFill">', () =>
    {
        Wrapper = mount( <Slider /> );

        expect( Wrapper.find( '.slider__trackFill' ) ).toHaveLength(1);
    });

    test('should have slider__disabled if isDisabled = true', () =>
    {
        const props = {
            isDisabled : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__disabled' ) ).toHaveLength(1);
    });

    test('should have slider__error if hasError = true', () =>
    {
        const props = {
            hasError : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__error' ) ).toHaveLength(1);
    });

    test('should have slider__hasHandleLabels when hasHandleLabels = true', () =>
    {
        const props = {
            hasHandleLabels : true
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__hasHandleLabels' ) ).toHaveLength(1);
    });

    test('should contain a label if filled', () =>
    {
        const props = {
            label : 'label'
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( Label ) ).toHaveLength(1);
    });

    test('should contain class slider__stepLabel if stepLabels Array is \
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

            expect( Wrapper.find( '.slider__stepLabel' ) ).toHaveLength(5);
        });


    test('should contain N inputs if value is array of length N', () =>
    {
        let props = {
            value    : [ 1 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );


        expect( Wrapper.find( 'input' ) ).toHaveLength(1);

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( 'input' ) ).toHaveLength(3);
    });

    test('should contain N handle labels if value is array of length N', () =>
    {
        let props = {
            value    : [ 1 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );


        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(1);

        props = {
            value    : [ 1, 2, 3 ],
            onChange : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(3);
    });

    test('should set correct position of the handle label', () =>
    {
        let props = {
            value               : [ 1 ],
            handleLabelPosition : 'top',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(1);
        expect( Wrapper.find( '.slider__handleLabelPosition__top' ) ).toHaveLength(1);

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'right',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(1);
        expect( Wrapper.find( '.slider__handleLabelPosition__right' ) ).toHaveLength(1);

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'bottom',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(1);
        expect( Wrapper.find( '.slider__handleLabelPosition__bottom' ) ).toHaveLength(1);

        props = {
            value               : [ 1 ],
            handleLabelPosition : 'left',
            hasHandleLabels     : true,
            onChange            : noop
        };

        Wrapper = mount( <Slider { ...props } /> );

        expect( Wrapper.find( '.slider__handleLabel' ) ).toHaveLength(1);
        expect( Wrapper.find( '.slider__handleLabelPosition__left' ) ).toHaveLength(1);
    });


    describe( 'getValue', () =>
    {
        test('should return a number', () =>
        {
            const result = Wrapper.instance().getValue( 1, 5 );

            expect( result ).to.be.a.number;
        });


        test('should return a value within min/max values', () =>
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

            expect( Wrapper.instance().getValue( 5, 3 ) ).toBeGreaterThanOrEqual(0);
            expect( Wrapper.instance().getValue( 5, 3 ) ).toBeLessThanOrEqual(200);
            expect( Wrapper.instance().getValue( 154, 250 ) ).toBe(154);
        });
    } );


    describe( 'handleDown', () =>
    {
        test('should be triggered when mousedown in the handle', () =>
        {
            const props = {
                value    : 150,
                onChange : noop
            };

            Wrapper = mount( <Slider { ...props } /> );
            const slider = Wrapper.instance();
            const handleDown = sinon.stub( slider, 'handleDown' );

            slider.forceUpdate();
            Wrapper.update();

            Wrapper.find( '.slider__handle' ).simulate( 'mousedown' );

            expect( handleDown.called ).toBe(true);
        });

        test('should trigger addEventListener when mousedown on the handle', () =>
        {
            const props = {
                value    : [ 50 ],
                onChange : noop
            };
            Wrapper = mount( <Slider { ...props } /> );

            const eventListenerSpy =
                sinon.spy( global, 'addEventListener' );

            Wrapper.find( '.slider__handle' ).simulate( 'mousedown' );
            expect( eventListenerSpy.calledTwice ).toBe(true);
            expect( eventListenerSpy.calledWith( 'mousemove' ) ).toBe(true);
            expect( eventListenerSpy.calledWith( 'mouseup' ) ).toBe(true);
        });
    } );


    describe( 'handleUp', () =>
    {
        test('should trigger removeEventListener', () =>
        {
            const handleUp = Wrapper.instance().handleUp;

            const removeEventListenerSpy = sinon.spy(
                global, 'removeEventListener' );

            const slider = Wrapper.instance();

            const mouseMoveSpy = sinon.spy( slider, 'handleMove' );
            const mouseUpSpy   = sinon.spy( slider, 'handleUp' );

            handleUp();

            expect( removeEventListenerSpy.calledTwice ).toBe(true);
            expect( removeEventListenerSpy.calledWith(
                'mousemove', mouseMoveSpy ) ).toBe(true);
            expect( removeEventListenerSpy.calledWith(
                'mouseup', mouseUpSpy ) ).toBe(true);
        });
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

    beforeEach(() =>
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
        outer   = wrapper.find( `.${cssMap.default}` );
        track   = wrapper.find( `.${cssMap.track}` );
        inputContainer = wrapper.find( `.${cssMap.inputContainer}` );
    });

    describe( 'click()', () =>
    {
        let clickSpy;

        beforeEach(() =>
        {
            clickSpy = sinon.spy();
            wrapper.setProps( { onClick: clickSpy } );
        });

        test('should fire the onClick callback prop exactly once', () =>
        {
            driver.click();
            expect( clickSpy.calledOnce ).toBe(true);
        });

        test('should not fire onClick when slider is disabled ', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( () => driver.click() ).to.throw;
            expect( clickSpy.notCalled ).toBe(true);
        });

        test('should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).toThrowError(expectedError);
        });
    } );

    describe( 'blur( index )', () =>
    {
        let onBlur;

        beforeEach(() =>
        {
            onBlur = sinon.spy();
            wrapper.setProps( { onBlur } );
        });

        test('should fire the onBlur callback prop exactly once', () =>
        {
            driver.blur();
            expect( onBlur.calledOnce ).toBe(true);
        });

        test('event target should be the first slider input when no index', () =>
        {
            driver.blur();
            const event = onBlur.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe(firstInput);
        });

        test('event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.blur( index );
            const event = onBlur.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).toBe(input);
        });

        test('should not fire onBlur when slider is disabled ', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( () => driver.click() ).to.throw;
            expect( onBlur.notCalled ).toBe(true);
        });

        test('should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be blurred since it is disabled';

            expect( () => driver.blur() ).toThrowError(expectedError);
        });
    } );

    describe( 'focus( index )', () =>
    {
        let onFocus;

        beforeEach(() =>
        {
            onFocus = sinon.spy();
            wrapper.setProps( { onFocus } );
        });

        test('should fire the onFocus callback prop exactly once', () =>
        {
            driver.focus();
            expect( onFocus.calledOnce ).toBe(true);
        });

        test('event target should be the first slider input when no index', () =>
        {
            driver.focus();
            const event = onFocus.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe(firstInput);
        });

        test('event target should be the slider input at index', () =>
        {
            const index = 1;
            driver.focus( index );
            const event = onFocus.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).toBe(input);
        });
    } );

    describe( 'keyDown( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyDown;

        beforeEach(() =>
        {
            onKeyDown = sinon.spy();
            wrapper.setProps( { onKeyDown } );
        });

        test('should fire the onKeyDown callback prop exactly once', () =>
        {
            driver.keyDown();
            expect( onKeyDown.calledOnce ).toBe(true);
        });

        test('should receive keyCode as event keyCode', () =>
        {
            driver.keyDown( keyCode );
            const event = onKeyDown.lastCall.args[ 0 ];
            expect( event.keyCode ).toBe(keyCode);
        });

        test('should receive first input as event target when no index', () =>
        {
            driver.keyDown();
            const event = onKeyDown.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe(firstInput);
        });

        test('should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyDown( null, index );
            const event = onKeyDown.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).toBe(input);
        });
    } );

    describe( 'keyUp( keyCode, index )', () =>
    {
        const keyCode = 40; // down arrow
        let onKeyUp;

        beforeEach(() =>
        {
            onKeyUp = sinon.spy();
            wrapper.setProps( { onKeyUp } );
        });

        test('should fire the onKeyUp callback prop exactly once', () =>
        {
            driver.keyUp();
            expect( onKeyUp.calledOnce ).toBe(true);
        });

        test('should receive keyCode as event keyCode', () =>
        {
            driver.keyUp( keyCode );
            const event = onKeyUp.lastCall.args[ 0 ];
            expect( event.keyCode ).toBe(keyCode);
        });

        test('should receive first input as event target when no index', () =>
        {
            driver.keyUp();
            const event = onKeyUp.lastCall.args[ 0 ];
            const firstInput = inputContainer.childAt( 0 ).node;

            expect( event.target ).toBe(firstInput);
        });

        test('should receive input at index as event target', () =>
        {
            const index = 1;
            driver.keyUp( null, index );
            const event = onKeyUp.lastCall.args[ 0 ];
            const input = inputContainer.childAt( index ).node;

            expect( event.target ).toBe(input);
        });
    } );

    describe( 'mouseOut()', () =>
    {
        let onMouseOut;

        beforeEach(() =>
        {
            onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );
        });

        test('should fire the onMouseOut callback prop exactly once', () =>
        {
            driver.mouseOut();
            expect( onMouseOut.calledOnce ).toBe(true);
        });

        test('should fire onMouseOut with outer wrapper as event target', () =>
        {
            driver.mouseOut();
            const event = onMouseOut.lastCall.args[ 0 ];
            expect( event.target ).toBe(outer.getNode());
        });

        test('should still fire onMouseOut when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOut();
            expect( onMouseOut.called ).toBe(true);
        });
    } );

    describe( 'mouseOver()', () =>
    {
        let onMouseOver;

        beforeEach(() =>
        {
            onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );
        });

        test('should fire the onMouseOver callback prop exactly once', () =>
        {
            driver.mouseOver();
            expect( onMouseOver.calledOnce ).toBe(true);
        });

        test('should fire onMouseOver with outer wrapper as event target', () =>
        {
            driver.mouseOver();
            const event = onMouseOver.lastCall.args[ 0 ];
            expect( event.target ).toBe(outer.getNode());
        });

        test('should still fire onMouseOver when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseOver();
            expect( onMouseOver.called ).toBe(true);
        });
    } );

    describe( 'mouseDown()', () =>
    {
        let onMouseDown;

        beforeEach(() =>
        {
            onMouseDown = sinon.spy();
            wrapper.setProps( { onMouseDown } );
        });

        test('should fire the onMouseDown callback prop exactly once', () =>
        {
            driver.mouseDown();
            expect( onMouseDown.calledOnce ).toBe(true);
        });

        test('should fire onMouseOver with track as event target', () =>
        {
            driver.mouseDown();
            const event = onMouseDown.lastCall.args[ 0 ];
            expect( event.target ).toBe(track.getNode());
        });

        test('should still fire onMouseDown when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            driver.mouseDown();
            expect( onMouseDown.called ).toBe(true);
        });
    } );

    describe( 'mouseUp()', () =>
    {
        let handleUp;

        beforeEach(() =>
        {
            handleUp = sinon.spy( wrapper.node, 'handleUp' );
        });

        test('should fire handleUp on the component instance', () =>
        {
            driver.mouseUp();
            expect( handleUp.calledOnce ).toBe(true);
        });
    } );

    describe( 'setInputValue( value )', () =>
    {
        let change;

        beforeEach(() =>
        {
            change    = sinon.spy( driver, 'change' );
        });

        test('should throw the expected error when slider is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            const expectedError =
                'Slider \'Pikaboo\' cannot be changed since it is disabled';

            expect( () => driver.setInputValue() ).toThrowError(expectedError);
        });

        test('should call the change method exactly once if single value', () =>
        {
            const value = 20;
            driver.setInputValue( value );
            expect( change.calledOnce ).toBe(true);
        });

        test('should call change method once per value if array of values', () =>
        {
            const value = [ 10, 20 ];
            driver.setInputValue( value );
            expect( change.calledTwice ).toBe(true);
        });

        test('should call change with value and index for each value', () =>
        {
            const value = [ 10, 20 ];
            driver.setInputValue( value );

            value.forEach( ( val, i ) =>
                expect( change.getCalls()[ i ].args ).toEqual([ val, i ])
            );
        });
    } );
} );
