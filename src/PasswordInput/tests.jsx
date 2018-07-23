/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-unused-expressions, no-magic-numbers  */

import React                            from 'react';
import { ReactWrapper, mount, shallow } from 'enzyme';

import { TextInputWithIcon }            from '../index';
import Css                              from '../hoc/Css';

import PasswordInput                    from './index';


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
        test( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength( 1 );
        } );

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

    describe( 'getErrorMessage()', () =>
    {
        beforeEach( () =>
        {
            wrapper.setProps( {
                hasError              : true,
                errorMessage          : <h2>Pikachu!</h2>,
                errorMessageIsVisible : true
            } );
        } );

        test( 'should return a ReactWrapper', () =>
        {
            expect( driver.getErrorMessage() ).toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the error message content', () =>
        {
            const message = driver.getErrorMessage();
            expect( message.find( 'h2' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'focus', () =>
    {
        test( 'should fire the onFocus callback prop once', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onFocus  : focusSpy
            } );

            wrapper.find( 'input' ).simulate( 'focus' );
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
                onBlur   : blurSpy
            } );

            wrapper.find( 'input' ).simulate( 'blur' );
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
                onChange : changeSpy
            } );

            driver.setInputValue( 'test' );
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
                onKeyPress : keyPressSpy
            } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).toBeCalledTimes( 1 );
        } );

        test( 'should fire the onInput callback prop once', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onChange : onChangeSpy
            } );

            driver.pressKey( keyCodeChar );
            expect( onChangeSpy ).toBeCalledTimes( 1 );
        } );

        test( 'inputValue should fire event for each key', () =>
        {
            const keyPressSpy = jest.fn();
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
                onChange   : onChangeSpy
            } );

            driver.inputValue( 'Harry Potter' );

            expect( keyPressSpy ).toBeCalledTimes( 12 );
            expect( onChangeSpy ).toBeCalledTimes( 12 );
        } );

        test( 'inputValue should change the text', () =>
        {
            driver.inputValue( 'Harry Potter' );
            expect( driver.getInputValue() ).toBe( 'Harry Potter' );
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
                onClick    : clickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).toThrowError( expectedError );
            expect( clickSpy ).not.toBeCalled();
        } );
    } );
} );
