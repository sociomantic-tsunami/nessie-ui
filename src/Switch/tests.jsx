/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-return-assign */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Switch             from './index';

const { cssMap } = Switch.defaultProps;


describe( 'Switch', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Switch /> );
    } );

    test( 'should pass isDisabled to <input> as “disabled”', () =>
    {
        wrapper.setProps( { isDisabled: true } );
        const input = wrapper.find( `.${cssMap.input}` );

        expect( input.prop( 'disabled' ) ).toBe( true );
    } );
} );


describe( 'SwitchDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Switch /> );
        driver  = wrapper.driver();
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

        test( 'should toggle target.checked', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { isChecked: true, onChange } );

            driver.change();
            expect( targetChecked ).toBeFalsy();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Switch cannot simulate change since it is disabled';
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
                const expectedError =
                    'Switch cannot simulate change since it is read only';
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


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback function', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();
            expect( onBlur ).toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Switch cannot simulate blur since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

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
                const expectedError =
                    'Switch cannot simulate blur since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isReadOnly: true } );

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
        test( 'should trigger onFocus callback function', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();
            expect( onFocus ).toBeCalled();
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Switch cannot simulate focus since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

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
                const expectedError =
                    'Switch cannot simulate focus since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isReadOnly: true } );

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


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback function', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalled();
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback function', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalled();
        } );
    } );
} );
