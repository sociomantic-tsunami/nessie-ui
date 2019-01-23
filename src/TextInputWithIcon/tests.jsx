/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React               from 'react';
import { shallow, mount }  from 'enzyme';

import {
    IconButton,
    TextInput,
    TextInputWithIcon,
} from '..';


describe( 'TextInputWithIcon', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithIcon /> );
    } );

    test( 'should contain exactly one TextInput', () =>
    {
        expect( wrapper.find( TextInput ) ).toHaveLength( 1 );
    } );

    test( 'should contain exactly one IconButton when iconType is not \
\'none\'', () =>
    {
        wrapper.setProps( { iconType: 'add' } );
        expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
    } );


    describe( 'props', () =>
    {
        describe( 'placeholder', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.placeholder )
                    .toBeUndefined();
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { placeholder: 'yes!' } );

                expect( wrapper.find( TextInput ).prop( 'placeholder' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'iconType', () =>
        {
            test( 'should be "none" by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.iconType )
                    .toBe( 'none' );
            } );

            test( 'should remove the IconButton when value is "none"', () =>
            {
                expect( wrapper.find( IconButton ) ).toHaveLength( 0 );
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( IconButton ).prop( 'iconType' ) )
                    .toBe( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be "right" by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.iconPosition )
                    .toBe( 'right' );
            } );

            test( 'should pass textAlign "left" to TextInput when value is \
"right"', () =>
            {
                wrapper.setProps( { iconPosition: 'right' } );

                expect( wrapper.find( TextInput ).prop( 'textAlign' ) )
                    .toBe( 'left' );
            } );

            test( 'should pass textAlign "right" to TextInput when value is \
"left"', () =>
            {
                wrapper.setProps( { iconPosition: 'left' } );

                expect( wrapper.find( TextInput ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'textAlign', () =>
        {
            test( 'should be "auto" by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.textAlign )
                    .toBe( 'auto' );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { textAlign: 'right' } );

                expect( wrapper.find( TextInput ).prop( 'textAlign' ) )
                    .toBe( 'right' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.isDisabled )
                    .toBe( false );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( TextInput ).prop( 'isDisabled' ) )
                    .toBe( true );
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType   : 'add',
                    isDisabled : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) )
                    .toBe( true );
            } );
        } );

        describe( 'iconButtonIsDisabled', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be false by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.iconButtonIsDisabled )
                    .toBe( false );
            } );

            test( 'should be passed to the IconButton as isDisabled', () =>
            {
                wrapper.setProps( { iconButtonIsDisabled: true } );

                expect( wrapper.find( IconButton ).prop( 'isDisabled' ) )
                    .toBe( true );
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.isReadOnly )
                    .toBe( false );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { isReadOnly: true } );

                expect( wrapper.find( TextInput ).prop( 'isReadOnly' ) )
                    .toBe( true );
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.hasError ).toBe( false );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( TextInput ).prop( 'hasError' ) )
                    .toBe( true );
            } );

            test( 'should be passed to the IconButton', () =>
            {
                wrapper.setProps( {
                    iconType : 'add',
                    hasError : true,
                } );

                expect( wrapper.find( IconButton ).prop( 'hasError' ) )
                    .toBe( true );
            } );
        } );

        describe( 'value', () =>
        {
            test( 'should be empty string by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.value ).toBe( '' );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { value: 'yes!' } );

                expect( wrapper.find( TextInput ).prop( 'value' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.id ).toBeUndefined();
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { id: 'yes!' } );

                expect( wrapper.find( TextInput ).prop( 'id' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'name', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.name ).toBeUndefined();
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { name: 'yes!' } );

                expect( wrapper.find( TextInput ).prop( 'name' ) )
                    .toBe( 'yes!' );
            } );
        } );

        describe( 'onClickIcon', () =>
        {
            beforeEach( () =>
            {
                wrapper.setProps( { iconType: 'add' } );
            } );

            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.onClickIcon )
                    .toBeUndefined();
            } );

            test( 'should be passed to the IconButton as onClick', () =>
            {
                const onClickIcon = () => undefined;

                wrapper.setProps( { onClickIcon } );

                expect( wrapper.find( IconButton ).prop( 'onClick' ) )
                    .toBe( onClickIcon );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.onFocus )
                    .toBeUndefined();
            } );
        } );

        describe( 'onBlur', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.onBlur )
                    .toBeUndefined();
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.onMouseOver )
                    .toBeUndefined();
            } );

            test( 'should not be passed to the TextInput', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( TextInput ).prop( 'onMouseOver' ) )
                    .toBe( undefined );
            } );

            test( 'should not be passed to the IconButton', () =>
            {
                const onMouseOver = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOver,
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOver' ) )
                    .not.toBe( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.onMouseOut )
                    .toBeUndefined();
            } );

            test( 'should not be passed to the TextInput', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( { onMouseOut } );

                expect( wrapper.find( TextInput ).prop( 'onMouseOut' ) )
                    .not.toBe( onMouseOut );
            } );

            test( 'should not be passed to the IconButton', () =>
            {
                const onMouseOut = () => undefined;

                wrapper.setProps( {
                    iconType : 'add',
                    onMouseOut,
                } );

                expect( wrapper.find( IconButton ).prop( 'onMouseOut' ) )
                    .not.toBe( onMouseOut );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( TextInputWithIcon.defaultProps.forceHover )
                    .toBe( false );
            } );

            test( 'should be passed to the TextInput', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( TextInput ).prop( 'forceHover' ) )
                    .toBe( true );
            } );
        } );
    } );
} );


describe( 'TextInputWithIconDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextInputWithIcon /> );
        driver  = wrapper.driver();
    } );


    describe( 'change( val )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change( 'dfg' );
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyDown()', () =>
    {
        test( 'should trigger onKeyDown callback prop once', () =>
        {
            const onKeyDown = jest.fn();
            wrapper.setProps( { onKeyDown } );

            driver.keyDown();
            expect( onKeyDown ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyPress()', () =>
    {
        test( 'should trigger onKeyPress callback prop once', () =>
        {
            const onKeyPress = jest.fn();
            wrapper.setProps( { onKeyPress } );

            driver.keyPress();
            expect( onKeyPress ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'keyUp()', () =>
    {
        test( 'should trigger onKeyUp callback prop once', () =>
        {
            const onKeyUp = jest.fn();
            wrapper.setProps( { onKeyUp } );

            driver.keyUp();
            expect( onKeyUp ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
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


    describe( 'clickIcon()', () =>
    {
        test( 'should trigger onClickIcon callback prop once', () =>
        {
            const onClickIcon = jest.fn();
            wrapper.setProps( { onClickIcon, iconType: 'add' } );

            driver.clickIcon();
            expect( onClickIcon ).toBeCalledTimes( 1 );
        } );
    } );
} );
