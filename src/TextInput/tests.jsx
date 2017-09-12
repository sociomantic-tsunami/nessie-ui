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

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name TextInput', () =>
        {
            expect( instance.constructor.name ).to.equal( 'TextInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).to.have.length( 1 );
        } );
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
        it( 'should fire the onBlur callback prop', () =>
        {
            const blurSpy = sinon.spy();
            wrapper.setProps( {
                title    : 'Test',
                hasError : false,
                onBlur   : blurSpy
            } );

            driver.blur();
            expect( blurSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'focus()', () =>
    {
        it( 'should fire the onFocus callback prop', () =>
        {
            const focusSpy = sinon.spy();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy.calledOnce ).to.be.true;
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        it( 'should fire the onChange callback prop', () =>
        {
            const changeSpy = sinon.spy();
            wrapper.setProps( { onChange: changeSpy } );

            driver.setInputValue( 'test' );

            expect( changeSpy ).to.be.calledOnce;
            expect( driver.getInputValue() ).to.equal( 'test' );
        } );

        it( 'should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) )
                .to.throw( expectedError );

            expect( onChangeSpy.notCalled ).to.be.true;
        } );

        it( 'should throw an error TextInput is read only', () =>
        {
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().setInputValue( 'pikachu' ) )
                .to.throw( expectedError );

            expect( onChangeSpy.notCalled ).to.be.true;
        } );
    } );

    describe( 'clearInputValue()', () =>
    {
        it( 'should throw an error when TextInput is disabled', () =>
        {
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                value      : 'pikachu',
                isDisabled : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is disabled';

            expect( () => wrapper.driver().clearInputValue() )
                .to.throw( expectedError );

            expect( onChangeSpy.notCalled ).to.be.true;
        } );

        it( 'should throw an error when TextInput is read only', () =>
        {
            const onChangeSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                value      : 'pikachu',
                isReadOnly : true,
                onChange   : onChangeSpy
            } );

            const expectedError =
                'Input \'test\' value cannot be changed since it is read only';

            expect( () => wrapper.driver().clearInputValue() )
                .to.throw( expectedError );

            expect( onChangeSpy.notCalled ).to.be.true;
        } );
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        it( 'keyPress Text input should fire an event', () =>
        {
            const keyCodeEnter = 13;
            const keyPressSpy = sinon.spy();
            wrapper.setProps( { onKeyPress: keyPressSpy } );

            driver.pressKey( keyCodeEnter );
            expect( keyPressSpy ).to.be.calledOnce;
        } );

        it( 'keyPress Text input should fire an onInput event', () =>
        {
            const keyCodeChar = String.fromCharCode( 74 );
            const onChangeSpy = sinon.spy();
            wrapper.setProps( { onChange: onChangeSpy } );

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

        it( 'should throw an error when TextInput is disabled', () =>
        {
            const keyPressSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onKeyPress : keyPressSpy
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is disabled';

            expect( () => wrapper.driver().pressKey() )
                .to.throw( expectedError );

            expect( keyPressSpy.notCalled ).to.be.true;
        } );

        it( 'should throw an error when TextInput is read only', () =>
        {
            const keyPressSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onKeyPress : keyPressSpy
            } );

            const expectedError =
                'Cannot press a key on Input \'test\' since it is read only';

            expect( () => wrapper.driver().pressKey() )
                .to.throw( expectedError );

            expect( keyPressSpy.notCalled ).to.be.true;
        } );
    } );

    describe( 'click()', () =>
    {
        it( 'should throw an error when TextInput is disabled', () =>
        {
            const handleClickSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isDisabled : true,
                onClick    : handleClickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is disabled';

            expect( () => wrapper.driver().click() ).to.throw( expectedError );
            expect( handleClickSpy.notCalled ).to.be.true;
        } );

        it( 'should throw an error when TextInput is read only', () =>
        {
            const handleClickSpy = sinon.spy();
            wrapper.setProps( {
                label      : 'test',
                isReadOnly : true,
                onClick    : handleClickSpy
            } );

            const expectedError =
                'Input \'test\' cannot be clicked since it is read only';

            expect( () => wrapper.driver().click() ).to.throw( expectedError );
            expect( handleClickSpy.notCalled ).to.be.true;
        } );
    } );
} );
