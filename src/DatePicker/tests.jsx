/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, max-len */

import React            from 'react';
import { mount }        from 'enzyme';

import { DatePicker }   from '../index';
import styles           from './datePicker.css';

describe( 'DatePickerDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <DatePicker cssMap = { styles } /> );
        driver = wrapper.driver();
    } );


    describe( 'clickItem()', () =>
    {
        test( 'should trigger onClickItem callback prop once', () =>
        {
            const onClickItem = jest.fn();
            wrapper.setProps( {
                onClickItem,
                headers : [
                    { label: 'Mon', title: 'Monday' },
                    { label: 'Tue', title: 'Tuesday' },
                    { label: 'Wed', title: 'Wednesday' },
                    { label: 'Thu', title: 'Thursday' },
                    { label: 'Fri', title: 'Friday' },
                    { label: 'Sat', title: 'Saturday' },
                    { label: 'Sun', title: 'Sunday' },
                ],
                items : [
                    [
                        {
                            label      : '01', value      : '1', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '02', value      : '2', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '03', value      : '3', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '04', value      : '4', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '05', value      : '5', isCurrent  : true, isSelected : true,
                        },
                        {
                            label      : '06', value      : '6', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '07', value      : '7', isCurrent  : false, isSelected : false,
                        },
                    ],
                ],
            } );

            driver.clickItem();
            expect( onClickItem ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'clickNext()', () =>
    {
        test( 'should trigger onClickNext callback prop once', () =>
        {
            const onClickNext = jest.fn();
            wrapper.setProps( {
                onClickNext,
            } );

            driver.clickNext();
            expect( onClickNext ).toBeCalledTimes( 1 );
        } );


        describe( 'nextIsDisabled', () =>
        {
            test( 'should throw the expected error when nextIsDisabled', () =>
            {
                const expectedError =
                    'Next cannot simulate click since it is disabled';
                wrapper.setProps( { nextIsDisabled: true } );

                expect( () => driver.clickNext() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClickNext callback prop when \
nextIsDisabled', () =>
            {
                const onClickNext = jest.fn();
                wrapper.setProps( {
                    onClickNext,
                    nextIsDisabled : true,
                } );

                try
                {
                    driver.clickNext();
                }
                catch ( error )
                {
                    expect( onClickNext ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        test( 'should trigger onClickPrev callback prop once', () =>
        {
            const onClickPrev = jest.fn();
            wrapper.setProps( {
                onClickPrev,
            } );

            driver.clickPrev();
            expect( onClickPrev ).toBeCalledTimes( 1 );
        } );


        describe( 'prevIsDisabled', () =>
        {
            test( 'should throw the expected error when prevIsDisabled', () =>
            {
                const expectedError =
                    'Previous cannot simulate click since it is disabled';
                wrapper.setProps( { prevIsDisabled: true } );

                expect( () => driver.clickPrev() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClickPrev callback prop when \
prevIsDisabled', () =>
            {
                const onClickPrev = jest.fn();
                wrapper.setProps( {
                    onClickPrev,
                    prevIsDisabled : true,
                } );

                try
                {
                    driver.clickPrev();
                }
                catch ( error )
                {
                    expect( onClickPrev ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'blurHourInput()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur, mode: 'default' } );

            driver.blurHourInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.blurHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop if mode is not \
<default>', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    mode : 'date',
                } );

                try
                {
                    driver.blurHourInput();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate blur since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isDisabled : true,
                } );

                try
                {
                    driver.blurHourInput();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focusHourInput()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus, mode: 'default' } );

            driver.focusHourInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.focusHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop if mode is not \
<default>', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    mode : 'date',
                } );

                try
                {
                    driver.focusHourInput();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate focus since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isDisabled : true,
                } );

                try
                {
                    driver.focusHourInput();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'changeHourInput()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange, mode: 'default' } );

            driver.changeHourInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop if mode is not \
<default>', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    mode : 'date',
                } );

                try
                {
                    driver.changeHourInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Input cannot simulate change since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.changeHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isDisabled : true,
                } );

                try
                {
                    driver.changeHourInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Input cannot simulate change since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.changeHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isReadOnly : true,
                } );

                try
                {
                    driver.changeHourInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPressHourInput()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress, mode: 'default' } );

            driver.keyPressHourInput();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop if mode is not \
<default>', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( {
                    onKeyPress,
                    mode : 'date',
                } );

                try
                {
                    driver.keyPressHourInput();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate keyPress since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyPressHourInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when isDisabled', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( {
                    onKeyPress,
                    isDisabled : true,
                } );

                try
                {
                    driver.keyPressHourInput();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'blurMinuteInput()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur, mode: 'default' } );

            driver.blurMinuteInput();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.blurMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop if mode is not \
<default>', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, mode: 'month' } );

                try
                {
                    driver.blurMinuteInput();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate blur since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

                try
                {
                    driver.blurMinuteInput();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focusMinuteInput()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus, mode: 'default' } );

            driver.focusMinuteInput();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.focusMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when <mode> is not \
<default>', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, mode: 'month' } );

                try
                {
                    driver.focusMinuteInput();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate focus since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

                try
                {
                    driver.focusMinuteInput();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'changeMinuteInput()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange, mode: 'default' } );

            driver.changeMinuteInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when <mode> is \
not <default>', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, mode: 'date' } );

                try
                {
                    driver.changeMinuteInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate change since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.changeMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isDisabled : true,
                } );

                try
                {
                    driver.changeMinuteInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate change since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.changeMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    onChange,
                    isReadOnly : true,
                } );

                try
                {
                    driver.changeMinuteInput();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPressMinuteInput()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress, mode: 'default' } );

            driver.keyPressMinuteInput();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when <mode> is \
not <default>', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, mode: 'date' } );

                try
                {
                    driver.keyPressMinuteInput();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TimeInput cannot simulate keyPress since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyPressMinuteInput() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when isDisabled', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( {
                    onKeyPress,
                    isDisabled : true,
                } );

                try
                {
                    driver.keyPressMinuteInput();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
