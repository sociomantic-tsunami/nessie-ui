/* eslint-env node, mocha */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { InputField }     from '../index';
import InputContainer     from '../proto/InputContainer';
import Css                from '../hoc/Css';

import TextInput          from './index';


describe( 'TextInput', () =>
{
    let wrapper;
    let instance;

    beforeEach(() =>
    {
        wrapper  = shallow( <TextInput /> );
        instance = wrapper.instance();
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name TextInput', () =>
        {
            expect( instance.constructor.name ).toBe('TextInput');
        });
    } );

    describe( 'render()', () =>
    {
        test('should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength(1);
        });

        test('should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength(1);
        });

        test('should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength(1);
        });
    } );
} );


describe( 'TextInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper = mount( <TextInput /> );
        driver  = wrapper.driver();
    });

    describe( 'blur()', () =>
    {
        test('should fire the onBlur callback prop', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy
            } );

            driver.blur();
            expect( blurSpy.calledOnce ).toBe(true);
        });
    } );

    describe( 'focus()', () =>
    {
        test('should fire the onFocus callback prop', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy.calledOnce ).toBe(true);
        });
    } );

    describe( 'setInputValue( value )', () =>
    {
        test('should fire the onChange callback prop', () =>
        {
            const changeSpy = jest.fn();
            wrapper.setProps( { onChange: changeSpy } );

            driver.setInputValue( 'test' );

            expect( changeSpy ).to.be.calledOnce;
            expect( driver.getInputValue() ).toBe('test');
        });

        test('should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) ).toThrowError(expectedError);

            expect( onChangeSpy.notCalled ).toBe(true);
        });

        test('should throw an error TextInput is read only', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) ).toThrowError(expectedError);

            expect( onChangeSpy.notCalled ).toBe(true);
        });
    } );

    describe( 'clearInputValue()', () =>
    {
        test('should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().clearInputValue() ).toThrowError(expectedError);

            expect( onChangeSpy.notCalled ).toBe(true);
        });

        test('should throw an error when TextInput is read only', () =>
        {
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().clearInputValue() ).toThrowError(expectedError);

            expect( onChangeSpy.notCalled ).toBe(true);
        });
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test('keyPress Text input should fire an event', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = jest.fn();
            wrapper.setProps( { onKeyPress: keyPressSpy } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).to.be.calledOnce;
        });

        test('keyPress Text input should fire an onInput event', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = jest.fn();
            wrapper.setProps( { onChange: onChangeSpy } );

            driver.pressKey( keyCodeChar );
            expect( onChangeSpy ).to.be.calledOnce;
        });

        test('inputValue should fire event for each key', () =>
        {
            const keyPressSpy = jest.fn();
            const onChangeSpy = jest.fn();
            wrapper.setProps( {
                onKeyPress : keyPressSpy,
                onChange   : onChangeSpy
            } );

            driver.inputValue( 'Harry Potter' );
            expect( keyPressSpy ).callCount( 12 );
            expect( onChangeSpy ).callCount( 12 );
        });
        test('inputValue should change the text', () =>
        {
            driver.inputValue( 'Harry Potter' );
            expect( driver.getInputValue() ).toBe('Harry Potter');
        });

        test('should throw an error when TextInput is disabled', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onKeyPress : keyPressSpy
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is disabled';

            expect( () => wrapper.driver().pressKey() ).toThrowError(expectedError);

            expect( keyPressSpy.notCalled ).toBe(true);
        });

        test('should throw an error when TextInput is read only', () =>
        {
            const keyPressSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onKeyPress : keyPressSpy
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is read only';

            expect( () => wrapper.driver().pressKey() ).toThrowError(expectedError);

            expect( keyPressSpy.notCalled ).toBe(true);
        });
    } );

    describe( 'click()', () =>
    {
        test('should throw an error when TextInput is disabled', () =>
        {
            const handleClickSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : handleClickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => wrapper.driver().click() ).toThrowError(expectedError);
            expect( handleClickSpy.notCalled ).toBe(true);
        });

        test('should throw an error when TextInput is read only', () =>
        {
            const handleClickSpy = jest.fn();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onClick    : handleClickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is read only';

            expect( () => wrapper.driver().click() ).toThrowError(expectedError);
            expect( handleClickSpy.notCalled ).toBe(true);
        });
    } );
} );
