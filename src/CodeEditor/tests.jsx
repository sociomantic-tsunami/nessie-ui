/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */
/* eslint no-console: 0*/

import React              from 'react';
import { shallow, mount } from 'enzyme';

import CodeEditor         from './index';

describe( 'CodeEditor', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <CodeEditor /> );
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


    describe( 'blur()', () =>
    {
        test( 'should call onBlur once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.focus();
            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError = 'CodeEditor cannot simulate blur since \
it is disabled';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError = 'CodeEditor cannot simulate blur since \
it is read only';

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isReadOnly', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onBlur,
                } );

                try
                {
                    driver.blur();
                }
                catch ( error )
                {
                    expect( onBlur ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should call onFocus once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();

            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError = 'CodeEditor cannot simulate focus since \
it is disabled';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError = 'CodeEditor cannot simulate focus since \
it is read only';

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isReadOnly', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onFocus,
                } );

                try
                {
                    driver.focus();
                }
                catch ( error )
                {
                    expect( onFocus ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'change()', () =>
    {
        test( 'should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change( 'Tekeli-li' );

            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                const expectedError = 'CodeEditor cannot simulate change since \
it is disabled';

                expect( () => driver.change( 'Cthulhu' ) )
                    .toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

                try
                {
                    driver.change( 'Cthulhu' );
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                const expectedError = 'CodeEditor cannot simulate change since \
it is read only';

                expect( () => driver.change( 'Azathoth' ) )
                    .toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( {
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                    onChange,
                } );

                try
                {
                    driver.change( 'Cthulhu' );
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'CodeEditor cannot simulate mouseOut \
since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onMouseOver,
                } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'CodeEditor cannot simulate mouseOut \
since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    isDisabled : true,
                    label      : 'Tekeli-li',
                    onMouseOut,
                } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'pressKey( keyCode )', () =>
    {
        test( 'should add the character corresponding to keyCode to the \
end of the code editor’s value', () =>
        {
            wrapper.setProps( { value: 'hello' } );

            driver.pressKey( 49 ); // key '1'
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
        test( 'should set the input value to "foo"', () =>
        {
            driver.setInputValue( 'foo' );
            expect( CodeMirror.getValue() ).toBe( 'foo' );
        } );

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
                .toThrowError( 'CodeEditor cannot simulate setInputValue since \
it is read only' );
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
                isReadOnly : true,
            } );
            expect( () => driver.clearInputValue() )
                .toThrowError( 'CodeEditor cannot simulate setInputValue since \
it is read only' );
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
        } );
    } );


    describe( 'isDisabled()', () =>
    {
        test( 'should return true if the editor is disabled', () =>
        {
            wrapper.setProps( { isDisabled: true } );
            expect( driver.isDisabled() ).toBeTruthy();
        } );
    } );
} );
