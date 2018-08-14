/* global jest test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions, max-len */

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
        test( 'should simulate and trigger onClickItem() once', () =>
        {
            const onClickItem = jest.fn();
            wrapper.setProps( {
                onClickItem,
                label   : 'January 2000',
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
                    [
                        {
                            label      : '08', value      : '8', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '09', value      : '9', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '10', value      : '10', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '11', value      : '11', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '12', value      : '12', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '13', value      : '13', isCurrent  : false, isSelected : false,
                        },
                        {
                            label      : '14', value      : '14', isCurrent  : false, isSelected : false,
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
        test( 'should simulate and trigger onClickNext() once', () =>
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
                    'Next cannot be clicked since it is disabled';

                wrapper.setProps( { nextIsDisabled: true } );

                expect( () => driver.clickNext() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { nextIsDisabled: true } );

                expect( () => driver.clickNext() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'clickPrev()', () =>
    {
        test( 'should simulate and trigger onClickPrev() once', () =>
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
                    'Previous cannot be clicked since it is disabled';

                wrapper.setProps( { prevIsDisabled: true } );

                expect( () => driver.clickPrev() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { prevIsDisabled: true } );

                expect( () => driver.clickPrev() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.blurHour() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Hour input cannot have blur since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurHour() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blurHour() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Hour input cannot have blur since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.blurHour() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blurHour() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.focusHour() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Hour input cannot have focus since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusHour() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focusHour() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Hour input cannot have focus since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.focusHour() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focusHour() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeHour() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressHour() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.blurMinute() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Minute input cannot have blur since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurMinute() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blurMinute() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Minute input cannot have blur since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.blurMinute() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blurMinute() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'month' } );

                expect( () => driver.focusMinute() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Minute input cannot have focus since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusMinute() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focusMinute() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Minute input cannot have focus since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.focusMinute() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focusMinute() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.changeMinute() );
                expect( simulate ).not.toBeCalled();
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

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { mode: 'date' } );

                expect( () => driver.keyPressMinute() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );
} );
