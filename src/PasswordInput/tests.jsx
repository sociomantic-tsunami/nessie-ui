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

import React                                from 'react';
import { mount, shallow }                   from 'enzyme';

import { PasswordInput, TextInputWithIcon } from '../index';


describe( 'PasswordInput', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <PasswordInput /> );
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

    beforeEach( () =>
    {
        wrapper = mount( <PasswordInput /> );
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop once', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onFocus  : focusSpy,
            } );

            wrapper.driver().focus();
            expect( focusSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'blur()', () =>
    {
        test( 'should fire the onBlur callback prop once', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy,
            } );

            wrapper.driver().blur();
            expect( blurSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        test( 'should fire the onChange callback prop once', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onChange : changeSpy,
            } );

            wrapper.driver().setInputValue( 'test' );
            expect( changeSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test( 'should fire the onKeyPress callback prop once', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
            } );

            wrapper.driver().pressKey( keyCodeEnter );
            expect( keyPressSpy ).toBeCalledTimes( 1 );
        } );

        test( 'should fire the onInput callback prop once', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onChange : onChangeSpy,
            } );

            wrapper.driver().pressKey( keyCodeChar );
            expect( onChangeSpy ).toBeCalledTimes( 1 );
        } );

        test( 'inputValue should fire event for each key', () =>
        {
            const keyPressSpy = jest.fn();
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
                onChange   : onChangeSpy,
            } );

            wrapper.driver().inputValue( 'Harry Potter' );

            expect( keyPressSpy ).toBeCalledTimes( 12 );
            expect( onChangeSpy ).toBeCalledTimes( 12 );
        } );
    } );

    describe( 'click()', () =>
    {
        test( 'should throw an error when PasswordInput is disabled', () =>
        {
            const clickSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : clickSpy,
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => wrapper.driver().click() )
                .toThrowError( expectedError );

            expect( clickSpy ).not.toBeCalled();
        } );
    } );
} );
