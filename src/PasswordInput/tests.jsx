/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-unused-expressions, no-magic-numbers  */

import React                    from 'react';
import { mount, shallow }       from 'enzyme';

import { TextInputWithIcon }    from '../index';

import PasswordInput            from './index';


describe( 'PasswordInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <PasswordInput /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one TextInputWithIcon', () =>
    {
        expect( wrapper.find( TextInputWithIcon ) ).toHaveLength( 1 );
    } );

    test( 'it should pass inputType "password" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .toBe( 'password' );
    } );

    test( 'it should pass iconType "show" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .toBe( 'show' );
    } );

    test( 'it should pass autoCapitalize "off"', () =>
    {
        expect( wrapper.find( TextInputWithIcon )
            .prop( 'autoCapitalize' ) ).toBe( 'off' );
    } );

    test( 'it should pass autoComplete "off"', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'autoComplete' ) )
            .toBe( 'off' );
    } );

    test( 'it should pass autoCorrect "off"', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'autoCorrect' ) )
            .toBe( 'off' );
    } );

    test( 'it should pass spellCheck false', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'spellCheck' ) )
            .toBe( false );
    } );

    describe( 'when passwordIsVisible', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( { passwordIsVisible: true } );
        } );

        test( 'it should pass inputType "text"', () =>
        {
            expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
                .toBe( 'text' );
        } );

        test( 'it should pass iconType "hide"', () =>
        {
            expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
                .toBe( 'hide' );
        } );
    } );
} );

describe( 'PasswordInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <PasswordInput /> );
        driver  = wrapper.driver();
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop once', () =>
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
                const expectedError = 'PasswordInput cannot simulate focus \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

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
                const expectedError = 'PasswordInput cannot simulate focus \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

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


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
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
                const expectedError = 'PasswordInput cannot simulate blur \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

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
                const expectedError = 'PasswordInput cannot simulate blur \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

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


    describe( 'change( val )', () =>
    {
        test( 'should fire the onChange callback prop once', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                onChange : changeSpy,
            } );

            driver.change( 'Azathoth' );
            expect( changeSpy ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate change \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.change( 'Azathoth' ) )
                    .toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isDisabled: true } );

                try
                {
                    driver.change( 'Azathoth' );
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
                const expectedError = 'PasswordInput cannot simulate change \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.change( 'Azathoth' ) )
                    .toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isReadOnly: true } );

                try
                {
                    driver.change( 'Azathoth' );
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should fire the onKeyPress callback prop once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate keyPress \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress when isDisabled', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, isDisabled: true } );

                try
                {
                    driver.keyPress();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate keyPress \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress when isReadOnly', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, isReadOnly: true } );

                try
                {
                    driver.keyPress();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
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


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate mouseOver \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver, isDisabled: true } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate mouseOver \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isReadOnly', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver, isReadOnly: true } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
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


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate mouseOut \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut, isDisabled: true } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate mouseOut \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isReadOnly', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut, isReadOnly: true } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'clickIcon()', () =>
    {
        test( 'should trigger onClickIcon callback once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( {
                onClickIcon,
            } );

            driver.clickIcon();
            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate clickIcon \
since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.clickIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClickIcon when isDisabled', () =>
            {
                const onClickIcon = jest.fn();
                wrapper.setProps( { onClickIcon, isDisabled: true } );

                try
                {
                    driver.clickIcon();
                }
                catch ( error )
                {
                    expect( onClickIcon ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate clickIcon \
since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.clickIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClickIcon when isReadOnly', () =>
            {
                const onClickIcon = jest.fn();
                wrapper.setProps( { onClickIcon, isReadOnly: true } );

                try
                {
                    driver.clickIcon();
                }
                catch ( error )
                {
                    expect( onClickIcon ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOverIcon()', () =>
    {
        test( 'should trigger onMouseOverIcon callback once', () =>
        {
            const onMouseOverIcon = jest.fn();
            wrapper.setProps( { onMouseOverIcon } );

            driver.mouseOverIcon();
            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate \
mouseOverIcon since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOverIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOverIcon when isDisabled', () =>
            {
                const onMouseOverIcon = jest.fn();
                wrapper.setProps( { onMouseOverIcon, isDisabled: true } );

                try
                {
                    driver.mouseOverIcon();
                }
                catch ( error )
                {
                    expect( onMouseOverIcon ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate \
mouseOverIcon since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOverIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOverIcon when isReadOnly', () =>
            {
                const onMouseOverIcon = jest.fn();
                wrapper.setProps( { onMouseOverIcon, isReadOnly: true } );

                try
                {
                    driver.mouseOverIcon();
                }
                catch ( error )
                {
                    expect( onMouseOverIcon ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOutIcon()', () =>
    {
        test( 'should trigger onMouseOutIcon callback once', () =>
        {
            const onMouseOutIcon = jest.fn();
            wrapper.setProps( { onMouseOutIcon } );

            driver.mouseOutIcon();
            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'PasswordInput cannot simulate \
mouseOutIcon since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.mouseOutIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOutIcon when isDisabled', () =>
            {
                const onMouseOutIcon = jest.fn();
                wrapper.setProps( { onMouseOutIcon, isDisabled: true } );

                try
                {
                    driver.mouseOutIcon();
                }
                catch ( error )
                {
                    expect( onMouseOutIcon ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'PasswordInput cannot simulate \
mouseOutIcon since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOutIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOutIcon when isReadOnly', () =>
            {
                const onMouseOutIcon = jest.fn();
                wrapper.setProps( { onMouseOutIcon, isReadOnly: true } );

                try
                {
                    driver.mouseOutIcon();
                }
                catch ( error )
                {
                    expect( onMouseOutIcon ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
