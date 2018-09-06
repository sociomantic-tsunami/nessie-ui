/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { InputField }     from '../index';

import TextInput          from './index';


describe( 'TextInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInput /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );
} );


describe( 'TextInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextInput /> );
        driver  = wrapper.driver();
    } );

    describe( 'blur()', () =>
    {
        test( 'should fire the onBlur callback prop', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy,
            } );

            driver.blur();
            expect( blurSpy ).toBeCalled();
        } );
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy ).toBeCalled();
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        test( 'should fire the onChange callback prop', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( { onChange: changeSpy } );

            driver.setInputValue( 'test' );

            expect( changeSpy ).toBeCalled();
        } );

        test( 'should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onChange   : onChangeSpy,
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) )
                .toThrowError( expectedError );

            expect( onChangeSpy ).not.toBeCalled();
        } );

        test( 'should throw an error TextInput is read only', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onChange   : onChangeSpy,
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) )
                .toThrowError( expectedError );

            expect( onChangeSpy ).not.toBeCalled();
        } );
    } );

    describe( 'clearInputValue()', () =>
    {
        test( 'should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onChange   : onChangeSpy,
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().clearInputValue() )
                .toThrowError( expectedError );

            expect( onChangeSpy ).not.toBeCalled();
        } );

        test( 'should throw an error when TextInput is read only', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onChange   : onChangeSpy,
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().clearInputValue() )
                .toThrowError( expectedError );

            expect( onChangeSpy ).not.toBeCalled();
        } );
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test( 'keyPress Text input should fire an event', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = jest.fn();
            wrapper.setProps( { onKeyPress: keyPressSpy } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).toBeCalled();
        } );

        test( 'keyPress Text input should fire an onInput event', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = jest.fn();
            wrapper.setProps( { onChange: onChangeSpy } );

            driver.pressKey( keyCodeChar );
            expect( onChangeSpy ).toBeCalled();
        } );

        test( 'inputValue should fire event for each key', () =>
        {
            const keyPressSpy = jest.fn();
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
                onChange   : onChangeSpy,
            } );

            driver.inputValue( 'Harry Potter' );
            expect( keyPressSpy ).toBeCalledTimes( 12 );
            expect( onChangeSpy ).toBeCalledTimes( 12 );
        } );

        test( 'should throw an error when TextInput is disabled', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onKeyPress : keyPressSpy,
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is disabled';

            expect( () => wrapper.driver().pressKey() )
                .toThrowError( expectedError );

            expect( keyPressSpy ).not.toBeCalled();
        } );

        test( 'should throw an error when TextInput is read only', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onKeyPress : keyPressSpy,
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is read only';

            expect( () => wrapper.driver().pressKey() )
                .toThrowError( expectedError );

            expect( keyPressSpy ).not.toBeCalled();
        } );
    } );

    describe( 'click()', () =>
    {
        test( 'should throw an error when TextInput is disabled', () =>
        {
            const handleClickSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : handleClickSpy,
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => wrapper.driver().click() )
                .toThrowError( expectedError );
            expect( handleClickSpy ).not.toBeCalled();
        } );

        test( 'should throw an error when TextInput is read only', () =>
        {
            const handleClickSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onClick    : handleClickSpy,
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is read only';

            expect( () => wrapper.driver().click() )
                .toThrowError( expectedError );
            expect( handleClickSpy ).not.toBeCalled();
        } );
    } );
} );
