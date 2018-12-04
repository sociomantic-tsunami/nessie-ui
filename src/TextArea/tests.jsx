/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                    from 'react';
import { shallow, mount }       from 'enzyme';

import { InputField, TextArea } from '../index';
import InputContainer           from '../proto/InputContainer';

describe( 'TextArea', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextArea /> );
        instance = wrapper.instance();
    } );

    test( 'should be an instance of StatelessComponent', () =>
    {
        expect( instance.constructor.name ).toBe( 'StatelessComponent' );
    } );

    test( 'should contain exactly one InputContainer', () =>
    {
        expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );

    test( 'InputField should have element="textarea"', () =>
    {
        expect( wrapper.find( InputField ).prop( 'element' ) )
            .toBe( 'textarea' );
    } );
} );


describe( 'TextAreaDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextArea /> );
        driver  = wrapper.driver();
    } );

    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( {  onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate blur since it is disabled';
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
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( {  onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate focus since it is disabled';
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


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {  onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate click since it is disabled';
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
        test( 'should trigger onKeyPress callback prop once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( {  onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate keyPress since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyPress() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
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


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback prop once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( {  onKeyUp } );

            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate keyUp since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyUp() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
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


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback prop once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( {  onKeyDown } );

            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate keyDown since it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.keyDown() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
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


    describe( 'change()', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( {  onChange } );

            driver.change( 'cba' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'TextArea cannot simulate change since it is disabled';
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
                    'TextArea cannot simulate change since it is read only';
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


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
