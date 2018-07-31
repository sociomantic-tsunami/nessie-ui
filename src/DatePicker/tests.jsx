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

                wrapper.setProps( {
                    nextIsDisabled : true,
                } );

                expect( () => driver.clickNext() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onClickNext = jest.fn();

                wrapper.setProps( { nextIsDisabled: true, onClickNext } );

                expect( () => driver.clickNext() );
                expect( onClickNext ).not.toBeCalled();
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

                wrapper.setProps( {
                    prevIsDisabled : true,
                } );

                expect( () => driver.clickPrev() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const onClickPrev = jest.fn();

                wrapper.setProps( { prevIsDisabled: true, onClickPrev } );

                expect( () => driver.clickPrev() );
                expect( onClickPrev ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'blurInput()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blurInput();

            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Input cannot have blur since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.blurInput() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blurInput() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Input cannot have blur since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.blurInput() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.hour}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blurInput() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'focusInput()', () =>
    {
        test( 'should trigger onFocus callback once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focusInput();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'should throw the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Input cannot have focus since it is disabled';

                wrapper.setProps( {
                    isDisabled : true,
                } );

                expect( () => driver.focusInput() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isDisabled', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focusInput() );
                expect( simulate ).not.toBeCalled();
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'should throw the expected error when isReadOnly', () =>
            {
                const expectedError =
                    'Input cannot have focus since it is read only';

                wrapper.setProps( {
                    isReadOnly : true,
                } );

                expect( () => driver.focusInput() ).toThrow( expectedError );
            } );

            test( 'does not call simulate( event ) when isReadOnly', () =>
            {
                const simulate = jest.spyOn( wrapper.find( `.${wrapper.props()
                    .cssMap.min}` ), 'simulate' );

                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focusInput() );
                expect( simulate ).not.toBeCalled();
            } );
        } );
    } );


    describe( 'changeInput()', () =>
    {
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeInput();

            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );
} );
