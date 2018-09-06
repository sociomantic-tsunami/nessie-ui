/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */
/* eslint no-console: 0*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import CodeEditor         from './index';


describe( 'CodeEditor', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper      = shallow( <CodeEditor /> );
        instance     = wrapper.instance();
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
    let driver;

    beforeEach( () =>
    {
        wrapper    = mount( <CodeEditor /> );
        CodeMirror = wrapper.instance().codeMirror;
        driver     = wrapper.driver();
    } );

    describe( 'pressKey( keyCode )', () =>
    {
        test( 'should add the character corresponding to keyCode to the \
end of the code editor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            driver.pressKey( 49 ); // 1 key
            expect( driver.getInputValue() ).toBe( 'hello1' );
        } );

        test( 'should call the onChange callback exactly once ', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.pressKey( 50 );
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'inputValue( value )', () =>
    {
        test( 'should add the value string to end of codeEditor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            driver.inputValue( 'world' );
            expect( driver.getInputValue() ).toBe( 'helloworld' );
        } );
        test( `should call the onChange callback once per
            printable character in value`, () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.inputValue( 'foo' );
            expect( onChange ).toBeCalledTimes( 3 );
        } );
    } );

    describe( 'setInputValue( value )', () =>
    {
        test( 'should fire the onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.setInputValue( 'foo' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should call onChange with new value as argument', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.setInputValue( 'foo' );
            expect( onChange ).toBeCalledWith( 'foo' );
        } );

        test( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( () => driver.setInputValue( 'foo' ) )
                .toThrowError( 'Cannot change the CodeEditor value since \
it’s read only' );
        } );
    } );

    describe( 'clearInputValue()', () =>
    {
        test( 'should set the input value to an empty string', () =>
        {
            wrapper.setProps( { defaultValue: 'foo' } );
            driver.clearInputValue();
            expect( CodeMirror.getValue() ).toBe( '' );
        } );

        test( 'should throw the expected error when component isReadOnly', () =>
        {
            wrapper.setProps( {
                value      : 'foo',
                isReadOnly : true
            } );
            expect( () => driver.clearInputValue() )
                .toThrowError( 'Cannot change the CodeEditor value since \
it’s read only' );
        } );
        test( 'should call the onChange callback exactly once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );
            driver.clearInputValue();
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getInputValue()', () =>
    {
        test( 'should return the value of the Code Editor input', () =>
        {
            wrapper.setProps( { value: 'foo' } );
            expect( driver.getInputValue() ).toBe( 'foo' );
        } );
    } );

    describe( 'isReadOnly()', () =>
    {
        test( 'should return true if the editor cannot be edited', () =>
        {
            wrapper.setProps( { isReadOnly: true } );
            expect( driver.isReadOnly() ).toBeTruthy();
            expect( driver.isDisabled() ).toBeFalsy();
        } );
    } );

    describe( 'isDisabled()', () =>
    {
        test( 'should return true if the editor is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( driver.isDisabled() ).toBeTruthy();
            expect( driver.isReadOnly() ).toBeFalsy();
        } );
    } );
} );
