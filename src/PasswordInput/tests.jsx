/* eslint-env node, mocha */
/* global expect */
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

    beforeEach(() =>
    {
        wrapper  = shallow( <PasswordInput /> );
        instance = wrapper.instance();
    });

    describe( 'constructor( props )', () =>
    {
        test('should have name PasswordInput', () =>
        {
            expect( instance.constructor.name ).toBe('PasswordInput');
        });
    } );

    describe( 'render()', () =>
    {
        test('should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength(1);
        });

        test('should contain exactly one TextInputWithIcon', () =>
        {
            expect( wrapper.find( TextInputWithIcon ) ).toHaveLength(1);
        });
    } );


    test('it should pass inputType "password" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) ).toBe('password');
    });

    test('it should pass inputType "text" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) ).toBe('text');
    });

    test('it should pass iconType "show" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) ).toBe('show');
    });

    test('it should pass iconType "hide" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) ).toBe('hide');
    });
} );

describe( 'PasswordInputDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach(() =>
    {
        wrapper = mount( <PasswordInput /> );
        driver  = wrapper.driver();
    });

    describe( 'getErrorMessage()', () =>
    {
        beforeEach(() =>
        {
            wrapper.setProps( {
                hasError              : true,
                errorMessage          : <h2>Pikachu!</h2>,
                errorMessageIsVisible : true
            } );
        });

        test('should return a ReactWrapper', () =>
        {
            expect( driver.getErrorMessage() ).toBeInstanceOf(ReactWrapper);
        });

        test('should contain the error message content', () =>
        {
            const message = driver.getErrorMessage();
            expect( message.find( 'h2' ) ).toHaveLength(1);
        });
    } );

    describe( 'focus()', () =>
    {
        test('should fire the onFocus callback prop', () =>
        {
            const focusSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onFocus  : focusSpy
            } );

            driver.focus();
            expect( focusSpy.calledOnce ).toBe(true);
        });
    } );

    describe( 'blur()', () =>
    {
        test('should fire the onBlur callback prop', () =>
        {
            const blurSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy
            } );

            driver.blur();
            expect( blurSpy ).to.be.calledOnce;
        });
    } );

    describe( 'setInputValue( value )', () =>
    {
        test('should fire the onChange callback prop', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onChange : changeSpy
            } );

            driver.setInputValue( 'test' );
            expect( changeSpy ).to.be.calledOnce;
        });
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test('should fire the onKeyPress callback prop', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = sinon.spy();
            wrapper.setProps( {
                onKeyPress : keyPressSpy
            } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).to.be.calledOnce;
        });

        test('should fire the onInput callback prop', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                onChange : onChangeSpy
            } );

            driver.pressKey( keyCodeChar );
            expect( onChangeSpy ).to.be.calledOnce;
        });

        test('inputValue should fire event for each key', () =>
        {
            const keyPressSpy = sinon.spy();
            const onChangeSpy = sinon.spy();
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
    } );

    describe( 'click()', () =>
    {
        test('should throw an error when PasswordInput is disabled', () =>
        {
            const clickSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : clickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).toThrowError(expectedError);
            expect( clickSpy.notCalled ).toBe(true);
        });
    } );
} );
