/* global test jest */
/* eslint no-console: 0*/
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

    describe( 'constructor( props )', () =>
    {
        test( 'should have name PasswordInput', () =>
        {
            expect( instance.constructor.name ).toBe( 'PasswordInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one TextInputWithIcon', () =>
        {
            expect( wrapper.find( TextInputWithIcon ) ).toHaveLength( 1 );
        } );
    } );


    test( 'it should pass inputType "password" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .toBe( 'password' );
    } );

    test( 'it should pass inputType "text" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .toBe( 'text' );
    } );

    test( 'it should pass iconType "show" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .toBe( 'show' );
    } );

    test( 'it should pass iconType "hide" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .toBe( 'hide' );
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
            const focusSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onFocus  : focusSpy,
            } );

            driver.focus();
            expect( focusSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'blur', () =>
    {
        test( 'should fire the onBlur callback prop once', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy,
            } );

            driver.blur();
            expect( blurSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'keyPress()', () =>
    {
        test( 'should fire the onKeyPress callback prop once', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
            } );

            driver.keyPress();
            expect( keyPressSpy ).toBeCalledTimes( 1 );
        } );

        test( 'should fire the onInput callback prop once', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onChange : onChangeSpy,
            } );

            driver.keyPress();
            expect( onChangeSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickInput()', () =>
    {
        test( 'should trigger onClick callback once', () =>
        {
            const clickSpy = jest.fn();
            wrapper.setProps( {
                onClick : clickSpy,
            } );

            driver.clickInput();

            expect( clickSpy ).toBeCalledTimes( 1 );
        } );
    } );
} );
