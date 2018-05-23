/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */
/* eslint no-console: 0*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import Css                from '../hoc/Css';

import CodeEditor         from './index';


describe( 'CodeEditor', () =>
{
    let wrapper;
    let instance;
    let cssMap;

    beforeEach( () =>
    {
        wrapper  = shallow( <CodeEditor /> );
        instance = wrapper.instance();
        cssMap   = instance.props.cssMap;
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one textArea', () =>
        {
            expect( wrapper.find( 'textarea' ).length ).to.equal( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        it( 'should pass value to the textarea as defaultValue', () =>
        {
            wrapper.setProps( { value: 'code!' } );

            expect( wrapper.find( 'textarea' ).prop( 'defaultValue' ) )
                .to.equal( 'code!' );
        } );
    } );
} );

describe( 'CodeEditorDriver', () =>
{
    let wrapper;
    let CodeMirror;
    let driver;

    beforeEach( () =>
    {
        wrapper    = mount( <CodeEditor /> );
        CodeMirror = wrapper.instance().codeMirror;
        driver     = wrapper.driver();
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        it( 'should add the character corresponding to keyCode to the end of\
the code editor’s value', () =>
            {
                wrapper.setProps( { value: 'hello' } );

                driver.pressKey( 49 ); // 1 key
                expect( driver.getInputValue() ).to.equal( 'hello1' );
            } );
    } );

    describe( 'inputValue( value )', () =>
    {
        it( 'should add the value string to end of codeEditor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            driver.inputValue( 'world' );
            expect( driver.getInputValue() ).to.equal( 'helloworld' );
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        it( 'should set the input value to "foo"', () =>
        {
            driver.setInputValue( 'foo' );
            expect( CodeMirror.getValue() ).to.equal( 'foo'  );
        } );

        it( 'should fire the onChange callback prop', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );
            driver.setInputValue( 'foo' );
            expect( onChange.calledOnce ).to.be.true;
        } );

        it( 'should call onChange with new value as argument', () =>
        {
            const onChange = sinon.spy();
            wrapper.setProps( { onChange } );
            driver.setInputValue( 'foo' );
            expect( onChange.calledWith( 'foo' ) ).to.be.true;
        } );

        it( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( () => driver.setInputValue( 'foo' ) ).to.throw(
                'Cannot change the CodeEditor value since it’s read only' );
        } );
    } );

    describe( 'clearInputValue()', () =>
    {
        it( 'should set the input value to an empty string', () =>
        {
            wrapper.setProps( { value: 'foo' } );
            driver.clearInputValue();
            expect( CodeMirror.getValue() ).to.equal( '' );
        } );

        it( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( {
                value      : 'foo',
                isReadOnly : true
            } );
            expect( () => driver.clearInputValue() ).to.throw(
                'Cannot change the CodeEditor value since it’s read only' );
        } );
    } );

    describe( 'getInputValue()', () =>
    {
        it( 'should return the value of the Code Editor input', () =>
        {
            wrapper.setProps( { value: 'foo' } );
            expect( driver.getInputValue() ).to.equal( 'foo' );
        } );
    } );

    describe( 'isReadOnly()', () =>
    {
        it( 'should return true if the editor cannot be edited', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( driver.isReadOnly() ).to.equal( true );
            expect( driver.isDisabled() ).to.equal( false );
        } );
    } );

    describe( 'isDisabled()', () =>
    {
        it( 'should return true if the editor is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( driver.isDisabled() ).to.equal( true );
            expect( driver.isReadOnly() ).to.equal( false );
        } );
    } );
} );
