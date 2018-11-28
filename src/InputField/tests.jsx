/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React      from 'react';
import { mount }  from 'enzyme';

import InputField from './index';

const { cssMap } = InputField.defaultProps;

describe( 'InputField', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <InputField /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one element', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'element', () =>
        {
            test( 'should be "input" by default', () =>
            {
                expect( InputField.defaultProps.element ).toBe( 'input' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { element: 'textarea' } );


                expect( wrapper.find( `.${cssMap.default}` ).type() )
                    .toBe( 'textarea' );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.forceHover ).toBeFalsy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.hasError ).toBeFalsy();
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.isDisabled ).toBe( false );
            } );

            test( 'should be passed to the input element as disabled', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'disabled' ) ).toBe( true );
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( InputField.defaultProps.isReadOnly ).toBe( false );
            } );

            test( 'should be passed to the input element as readOnly', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'readOnly' ) ).toBe( true );
            } );
        } );

        describe( 'name', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.name ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'name' ) ).toBe( 'yes!' );
            } );
        } );

        describe( 'onBlur', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onBlur ).toBeUndefined();
            } );
            test( 'should be passed to the input element', () =>
            {
                const onBlur = () => undefined;

                wrapper.setProps( { onBlur } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onBlur' ) ).toBe( onBlur );
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onChange ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                const onChange = () => undefined;
                wrapper.setProps( { onChange } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onChange' ) ).toBe( onChange );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onFocus ).toBeUndefined();
            } );
            test( 'should be passed to the input element', () =>
            {
                const onFocus = () => undefined;

                wrapper.setProps( { onFocus } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onFocus' ) ).toBe( onFocus );
            } );
        } );

        describe( 'onKeyPress', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onKeyPress ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                const onKeyPress = () => undefined;
                wrapper.setProps( { onKeyPress } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onKeyPress' ) ).toBe( onKeyPress );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onMouseOut ).toBeUndefined();
            } );

            test( 'should be passed to the input element as onMouseLeave', () =>
            {
                const onMouseOut = () => undefined;
                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onMouseLeave' ) ).toBe( onMouseOut );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.onMouseOver ).toBeUndefined();
            } );

            test( 'should be passed to the input element as onMouseEnter', () =>
            {
                const onMouseOver = () => undefined;
                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'onMouseEnter' ) ).toBe( onMouseOver );
            } );
        } );

        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( InputField.defaultProps.placeholder ).toBeUndefined();
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` )
                    .prop( 'placeholder' ) ).toBe( 'yes!' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( InputField.defaultProps.textAlign ).toBe( 'left' );
            } );
        } );

        describe( 'type', () =>
        {
            test( 'should be "text" by default', () =>
            {
                expect( InputField.defaultProps.type ).toBe( 'text' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { type: 'number' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'type' ) )
                    .toBe( 'number' );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be empty string by default', () =>
            {
                expect( InputField.defaultProps.value ).toBe( '' );
            } );

            test( 'should be passed to the input element', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( `.${cssMap.default}` ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );
    } );
} );


describe( 'InputFieldDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <InputField /> );
        driver  = wrapper.driver();
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate blur since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( { onBlur, isDisabled: true } );

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
        test( 'should trigger onFocus callback once', () =>
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
                const expectedError =
                    'InputField cannot simulate focus since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus, isDisabled: true } );

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
        test( 'should trigger onChange callback once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate change since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isDisabled', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isDisabled: true } );

                try
                {
                    driver.change();
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
                const expectedError =
                    'InputField cannot simulate change since it is read only';
                wrapper.setProps( { isReadOnly: true } );

                expect( () => driver.change() ).toThrow( expectedError );
            } );

            test( 'should not trigger onChange when isReadOnly', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange, isReadOnly: true } );

                try
                {
                    driver.change();
                }
                catch ( error )
                {
                    expect( onChange ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate click since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isDisabled: true } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should trigger onKeyPress callback once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate keyPress since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyPress when isDisabled', () =>
            {
                const onKeyPress = jest.fn();
                wrapper.setProps( { onKeyPress, isDisabled: true } );

                try
                {
                    driver.keyPress();
                }
                catch ( error )
                {
                    expect( onKeyPress ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );

            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate keyDown since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyDown() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyDown when isDisabled', () =>
            {
                const onKeyDown = jest.fn();
                wrapper.setProps( { onKeyDown, isDisabled: true } );

                try
                {
                    driver.keyDown();
                }
                catch ( error )
                {
                    expect( onKeyDown ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );

            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'InputField cannot simulate keyUp since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyUp() ).toThrow( expectedError );
            } );

            test( 'should not trigger onKeyUp when isDisabled', () =>
            {
                const onKeyUp = jest.fn();
                wrapper.setProps( { onKeyUp, isDisabled: true } );

                try
                {
                    driver.keyUp();
                }
                catch ( error )
                {
                    expect( onKeyUp ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
