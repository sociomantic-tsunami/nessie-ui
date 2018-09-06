/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers */

import React                             from 'react';
import { shallow, mount }                from 'enzyme';

import { InputField, FlounderDropdown }  from '../index';
import InputContainer                    from '../proto/InputContainer';

import TextInputWithDropdown             from './index';


describe( 'TextInputWithDropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithDropdown /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one FlounderDropdown', () =>
        {
            expect( wrapper.find( FlounderDropdown ) ).toHaveLength( 1 );
        } );
    } );
} );


describe( 'TextInputWithDropdownDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <TextInputWithDropdown /> );
        driver  = wrapper.driver();
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


    describe( 'changeInput( val )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeInput();
            expect( onChange ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'changeFlounder( val )', () =>
    {
        test( 'should trigger onChange callback prop once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.changeFlounder();
            expect( onChange ).toBeCalledTimes( 1 );
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
