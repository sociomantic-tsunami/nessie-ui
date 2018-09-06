/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React      from 'react';
import { mount }  from 'enzyme';

import CodeEditor from './index';


describe( 'CodeEditor', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <CodeEditor /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one textArea', () =>
        {
            expect( wrapper.find( 'textarea' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        test( 'should pass value to the textarea as defaultValue', () =>
        {
            wrapper.setProps( { value: 'code!' } );

            expect( wrapper.find( 'textarea' ).prop( 'defaultValue' ) )
                .toBe( 'code!' );
        } );
    } );
} );

describe( 'CodeEditorDriver', () =>
{
    let wrapper;
    let CodeMirror;

    beforeEach( () =>
    {
        wrapper    = mount( <CodeEditor /> );
        CodeMirror = wrapper.instance().codeMirror;
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test( 'should add the character corresponding to keyCode to the \
end of the code editor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            wrapper.driver().pressKey( 49 ); // 1 key
            expect( wrapper.driver().getInputValue() ).toBe( 'hello1' );
        } );

        test( 'should call the onChange callback exactly once ', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().pressKey( 50 );
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'inputValue( value )', () =>
    {
        test( 'should add the value string to end of codeEditor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            wrapper.driver().inputValue( 'world' );
            expect( wrapper.driver().getInputValue() ).toBe( 'helloworld' );
        } );
        test( `should call the onChange callback once per
            printable character in value`, () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().inputValue( 'foo' );
            expect( onChange ).toBeCalledTimes( 3 );
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        test( 'should fire the onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().setInputValue( 'foo' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should call onChange with new value as argument', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().setInputValue( 'foo' );
            expect( onChange ).toBeCalledWith( 'foo' );
        } );

        test( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( () => wrapper.driver().setInputValue( 'foo' ) )
                .toThrowError( 'Cannot change the CodeEditor value since \
it’s read only' );
        } );
    } );

    describe( 'clearInputValue()', () =>
    {
        test( 'should set the input value to an empty string', () =>
        {
            wrapper.setProps( { defaultValue: 'foo' } );
            wrapper.driver().clearInputValue();
            expect( CodeMirror.getValue() ).toBe( '' );
        } );

        test( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( {
                value      : 'foo',
                isReadOnly : true,
            } );
            expect( () => wrapper.driver().clearInputValue() )
                .toThrowError( 'Cannot change the CodeEditor value since \
it’s read only' );
        } );
        test( 'should call the onChange callback exactly once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            wrapper.driver().clearInputValue();
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getInputValue()', () =>
    {
        test( 'should return the value of the Code Editor input', () =>
        {
            wrapper.setProps( { value: 'foo' } );
            expect( wrapper.driver().getInputValue() ).toBe( 'foo' );
        } );
    } );

    describe( 'isReadOnly()', () =>
    {
        test( 'should return true if the editor cannot be edited', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( wrapper.driver().isReadOnly() ).toBeTruthy();
            expect( wrapper.driver().isDisabled() ).toBeFalsy();
        } );
    } );

    describe( 'isDisabled()', () =>
    {
        test( 'should return true if the editor is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( wrapper.driver().isDisabled() ).toBeTruthy();
            expect( wrapper.driver().isReadOnly() ).toBeFalsy();
        } );
    } );
} );
