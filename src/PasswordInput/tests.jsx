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

    beforeEach( () =>
    {
        wrapper  = shallow( <PasswordInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name PasswordInput', () =>
        {
            expect( instance.constructor.name ).to.equal( 'PasswordInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one TextInputWithIcon', () =>
        {
            expect( wrapper.find( TextInputWithIcon ) ).to.have.length( 1 );
        } );
    } );


    it( 'it should pass inputType "password" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .to.equal( 'password' );
    } );

    it( 'it should pass inputType "text" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'inputType' ) )
            .to.equal( 'text' );
    } );

    it( 'it should pass iconType "show" by default', () =>
    {
        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .to.equal( 'show' );
    } );

    it( 'it should pass iconType "hide" when passwordIsVisible', () =>
    {
        wrapper.setProps( { passwordIsVisible: true } );

        expect( wrapper.find( TextInputWithIcon ).prop( 'iconType' ) )
            .to.equal( 'hide' );
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

        it( 'should return a ReactWrapper', () =>
        {
            expect( driver.getErrorMessage() ).to.be.instanceOf( ReactWrapper );
        } );

        it( 'should contain the error message content', () =>
        {
            const message = driver.getErrorMessage();
            expect( message.find( 'h2' ) ).to.have.length( 1 );
        } );
    } );

    describe( 'focus()', () =>
    {
        it( 'should fire the onFocus callback prop', () =>
        {
            const focusSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onFocus  : focusSpy
            } );

            driver.focus();
            expect( focusSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'blur()', () =>
    {
        it( 'should fire the onBlur callback prop', () =>
        {
            const blurSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy
            } );

            driver.blur();
            expect( blurSpy ).to.be.calledOnce;
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        it( 'should fire the onChange callback prop', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onChange : changeSpy
            } );

            driver.setInputValue( 'test' );
            expect( changeSpy ).to.be.calledOnce;
        } );
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        it( 'should fire the onKeyPress callback prop', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = sinon.spy();
            wrapper.setProps( {
                onKeyPress : keyPressSpy
            } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).to.be.calledOnce;
        } );

        it( 'should fire the onInput callback prop', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                onChange : onChangeSpy
            } );

            driver.pressKey( keyCodeChar );
            expect( onChangeSpy ).to.be.calledOnce;
        } );

        it( 'inputValue should fire event for each key', () =>
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
        } );

        it( 'inputValue should change the text', () =>
        {
            driver.inputValue( 'Harry Potter' );
            expect( driver.getInputValue() ).to.equal( 'Harry Potter' );
        } );
    } );

    describe( 'click()', () =>
    {
        it( 'should throw an error when PasswordInput is disabled', () =>
        {
            const clickSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : clickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => driver.click() ).to.throw( expectedError );
            expect( clickSpy.notCalled ).to.be.true;
        } );
    } );
} );
