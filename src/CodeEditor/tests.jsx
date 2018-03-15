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
        it( 'should pass value to CodeEditor', () =>
        {
            wrapper.setProps( { value: 'code!' } );

            expect( wrapper.find( 'textarea' ).prop( 'defaultValue' ) )
                .to.equal( 'code!' );
        } );

        it( 'should pass onMouseOver to the container div', () =>
        {
            const onMouseOver = sinon.spy();
            wrapper.setProps( { onMouseOver } );

            expect( wrapper.find( `.${cssMap.editor}` )
                .prop( 'onMouseEnter' ) ).to.equal( onMouseOver );
        } );

        it( 'should pass onMouseOut to the container div', () =>
        {
            const onMouseOut = sinon.spy();
            wrapper.setProps( { onMouseOut } );

            expect( wrapper.find( `.${cssMap.editor}` )
                .prop( 'onMouseLeave' ) ).to.equal( onMouseOut );
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

    describe( 'setInputValue( value )', () =>
    {
        it( 'should set the input value to "foo"', () =>
        {
            const arg = 'foo';
            driver.setInputValue( arg );
            expect( CodeMirror.getValue() ).to.equal( arg );
        } );

        it( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            const arg = 'foo';
            expect( () => driver.setInputValue( arg ) ).to.throw(
                'Cannot change the CodeEditor value since it is read-only' );
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
                'Cannot change the CodeEditor value since it is read-only' );
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
