/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global jest test */
/* eslint-disable no-magic-numbers */

import React                    from 'react';
import { mount }                from 'enzyme';

import { DateTimeInput }        from '../index';

describe( 'DateTimeInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <DateTimeInput /> );
        driver   = wrapper.driver();
    } );


    describe( 'blurMainInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurMainInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate blur since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurMainInput() ).toThrow( expectedError );
            } );

            test(
                'should not trigger onBlur callback prop when isDisabled',
                () =>
                {
                    const onBlur = jest.fn();
                    wrapper.setProps( {
                        onBlur,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.blurMainInput();
                    }
                    catch ( error )
                    {
                        expect( onBlur ).not.toBeCalled();
                    }
                },
            );
        } );
    } );

    describe( 'focusMainInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusMainInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate focus since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onFocus callback prop when isDisabled',
                () =>
                {
                    const onFocus = jest.fn();
                    wrapper.setProps( {
                        onFocus,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.focusMainInput();
                    }
                    catch ( error )
                    {
                        expect( onFocus ).not.toBeCalled();
                    }
                },
            );
        } );
    } );


    describe( 'blurHourInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurHourInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusHourInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusHourInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blurMinuteInput()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurMinuteInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focusMinuteInput()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusMinuteInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickCellByIndex()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = jest.fn();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        test( 'should fire onClickCell exactly once', () =>
        {
            driver.clickCellByIndex( 1 );
            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given index', () =>
        {
            driver.clickCellByIndex( 1 );
            expect( onClickCell.mock.calls[ 0 ][ 0 ] ).toBe( '2' );
        } );
    } );

    describe( 'clickCellByValue()', () =>
    {
        let onClickCell;

        beforeEach( () =>
        {
            onClickCell = jest.fn();
            wrapper.setProps( {
                weeks : [ [ { value: '1' }, { value: '2' }, { value: '3' } ] ],
                onClickCell,
            } );
        } );

        test( 'should fire onClickCell exactly once', () =>
        {
            driver.clickCellByValue( '1' );
            expect( onClickCell ).toBeCalledTimes( 1 );
        } );

        test( 'should click on cell with given value', () =>
        {
            driver.clickCellByValue( '3' );
            expect( onClickCell.mock.calls[ 0 ][ 0 ] ).toBe( '3' );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        test( 'should fire onClickPrev exactly once', () =>
        {
            const onClickPrev = jest.fn();
            wrapper.setProps( {
                onClickPrev,
            } );

            driver.clickPrev();
            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickNext()', () =>
    {
        test( 'should fire onClickNext exactly once', () =>
        {
            const onClickNext = jest.fn();
            wrapper.setProps( {
                onClickNext,
            } );

            driver.clickNext();
            expect( onClickNext ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickIcon()', () =>
    {
        test( 'should fire onClickIcon exactly once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( {
                onClickIcon,
            } );

            driver.clickIcon();
            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'changeMainInput( val )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( {
                onChange,
            } );

            driver.changeMainInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate change since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.changeMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onChange callback prop when isDisabled',
                () =>
                {
                    const onChange = jest.fn();
                    wrapper.setProps( {
                        onChange,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.changeMainInput();
                    }
                    catch ( error )
                    {
                        expect( onChange ).not.toBeCalled();
                    }
                },
            );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Main input cannot simulate change since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.changeMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onChange callback prop when isReadOnly',
                () =>
                {
                    const onChange = jest.fn();
                    wrapper.setProps( {
                        onChange,
                        isReadOnlyInput : true,
                    } );

                    try
                    {
                        driver.changeMainInput();
                    }
                    catch ( error )
                    {
                        expect( onChange ).not.toBeCalled();
                    }
                },
            );
        } );
    } );


    describe( 'changeHourInput()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeHourInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'changeMinuteInput()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeMinuteInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyDownMainInput( keyCode )', () =>
    {
        test( 'should call onKeyDown once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );

            driver.keyDownMainInput();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate keyDown since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyDownMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onKeyDown callback prop when isDisabled',
                () =>
                {
                    const onKeyDown = jest.fn();
                    wrapper.setProps( {
                        onKeyDown,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.keyDownMainInput();
                    }
                    catch ( error )
                    {
                        expect( onKeyDown ).not.toBeCalled();
                    }
                },
            );
        } );
    } );


    describe( 'keyUpMainInput( keyCode )', () =>
    {
        test( 'should call onKeyUp once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );

            driver.keyUpMainInput();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate keyUp since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyUpMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onKeyUp callback prop when isDisabled',
                () =>
                {
                    const onKeyUp = jest.fn();
                    wrapper.setProps( {
                        onKeyUp,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.keyUpMainInput();
                    }
                    catch ( error )
                    {
                        expect( onKeyUp ).not.toBeCalled();
                    }
                },
            );
        } );
    } );


    describe( 'keyPressMainInput( keyCode )', () =>
    {
        test( 'should call onKeyPress once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressMainInput();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Main input cannot simulate keyPress since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyPressMainInput() )
                    .toThrow( expectedError );
            } );

            test(
                'should not trigger onKeyPress callback prop when isDisabled',
                () =>
                {
                    const onKeyPress = jest.fn();
                    wrapper.setProps( {
                        onKeyPress,
                        isDisabled : true,
                    } );

                    try
                    {
                        driver.keyPressMainInput();
                    }
                    catch ( error )
                    {
                        expect( onKeyPress ).not.toBeCalled();
                    }
                },
            );
        } );
    } );


    describe( 'keyPressHourInput()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressHourInput();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPressMinuteInput()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressMinuteInput();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
