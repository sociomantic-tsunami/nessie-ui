/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-unused-expressions */

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Checkable          from '../proto/Checkable';

import Radio              from './index';


describe( 'Radio', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Radio /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .toBe( true );
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .toBe( true );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .toBe( true );
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be `undefined` if readOnly', () =>
            {
                const onChange = jest.fn().mockImplementation( e =>
                    targetChecked = e.target.checked );
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.prop( onChange ) ).toBeUndefined();
            } );

            test(
                'should be passed as `undefined` to Checkable if readOnly',
                () =>
                {
                    const onChange = jest.fn().mockImplementation( e =>
                        targetChecked = e.target.checked );
                    wrapper.setProps( { isReadOnly: true, onChange } );

                    expect( wrapper.find( Checkable ).prop( onChange ) )
                        .toBeUndefined();
                },
            );

            test( 'should be defined if not readOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );
    } );
} );


describe( 'RadioDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Radio /> );
        driver   = wrapper.driver();
    } );


    describe( 'blur()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
blur since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
blur since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
focus since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
focus since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should not call onChange if Radio is checked', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange, isChecked: true } );

            driver.change();
            expect( onChange ).not.toBeCalled();
        } );

        test( 'should change the value of target.checked to true', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { onChange, isChecked: false } );

            driver.change();
            expect( targetChecked ).toBeTruthy();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
change since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

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
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
change since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

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


    describe( 'click()', () =>
    {
        test( 'should call onClick once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
click since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onClick,
                } );

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


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Radio \'Tekeli-li\' cannot simulate \
click since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onClick,
                } );

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


    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
