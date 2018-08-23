/* eslint-disable no-magic-numbers, no-multi-str, max-len */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import DatePicker           from './index';

describe( 'DatePicker', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <DatePicker /> );
        instance = wrapper.instance();
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${instance.props.cssMap.default}` ) )
            .toHaveLength( 1 );
    } );
} );


describe( 'DatePickerDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <DatePicker /> );
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
                    'Next cannot onClick since it is disabled';
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
                    'Previous cannot onClick since it is disabled';
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


    describe( 'blurHour()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurHour();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.blurHour() ).toThrow( expectedError );
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
                    driver.blurHour();
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
                    'TimeInput cannot onBlur since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurHour() ).toThrow( expectedError );
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
                    driver.blurHour();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot onBlur since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.blurHour() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isReadOnly : true,
                } );

                try
                {
                    driver.blurHour();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focusHour()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusHour();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.focusHour() ).toThrow( expectedError );
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
                    driver.focusHour();
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
                    'TimeInput cannot onFocus since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusHour() ).toThrow( expectedError );
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
                    driver.focusHour();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot onFocus since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.focusHour() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isReadOnly : true,
                } );

                try
                {
                    driver.focusHour();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'changeHour()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeHour();
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeHour() ).toThrow( expectedError );
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
                    driver.changeHour();
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
                    'Input cannot onChange since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.changeHour() ).toThrow( expectedError );
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
                    driver.changeHour();
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
                    'Input cannot onChange since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.changeHour() ).toThrow( expectedError );
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
                    driver.changeHour();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPressHour()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressHour();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressHour() ).toThrow( expectedError );
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
                    driver.keyPressHour();
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
                    'TimeInput cannot onKeyPress since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyPressHour() ).toThrow( expectedError );
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
                    driver.keyPressHour();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot onKeyPress since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.keyPressHour() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when isReadOnly', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( {
                    onKeyPress,
                    isReadOnly : true,
                } );

                try
                {
                    driver.keyPressHour();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'blurMinute()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurMinute();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.blurMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop if mode is not \
<default>', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, mode: 'month' } );

                try
                {
                    driver.blurMinute();
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
                    'TimeInput cannot onBlur since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

                try
                {
                    driver.blurMinute();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot onBlur since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.blurMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur callback prop when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isReadOnly: true } );

                try
                {
                    driver.blurMinute();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focusMinute()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusMinute();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.focusMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when <mode> is not \
<default>', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, mode: 'month' } );

                try
                {
                    driver.focusMinute();
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
                    'TimeInput cannot onFocus since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

                try
                {
                    driver.focusMinute();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'TimeInput cannot onFocus since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.focusMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus callback prop when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isReadOnly: true } );

                try
                {
                    driver.focusMinute();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'changeMinute()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeMinute();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange callback prop when <mode> is \
not <default>', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, mode: 'date' } );

                try
                {
                    driver.changeMinute();
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
                    'TimeInput cannot onChange since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.changeMinute() ).toThrow( expectedError );
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
                    driver.changeMinute();
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
                    'TimeInput cannot onChange since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.changeMinute() ).toThrow( expectedError );
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
                    driver.changeMinute();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPressMinute()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPressMinute();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'mode is not <default>', () =>
        {
            test( 'should throw an error if mode is not <default>', () =>
            {
                const expectedError =
                    'There\'s no input because <mode> is not <default>';
                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when <mode> is \
not <default>', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, mode: 'date' } );

                try
                {
                    driver.keyPressMinute();
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
                    'TimeInput cannot onKeyPress since it is disabled';
                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.keyPressMinute() ).toThrow( expectedError );
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
                    driver.keyPressMinute();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Input cannot onKeyPress since it is read only';
                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.keyPressMinute() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress callback prop when isReadOnly', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( {
                    onKeyPress,
                    isReadOnly : true,
                } );

                try
                {
                    driver.keyPressMinute();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
