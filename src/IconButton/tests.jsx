/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */


import React              from 'react';
import { shallow, mount } from 'enzyme';

import { Icon }           from '../index';

import IconButton         from './index';


describe( 'IconButton', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <IconButton /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name IconButton', () =>
        {
            expect( instance.constructor.name ).toBe( 'IconButton' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Icon', () =>
        {
            expect( wrapper.find( Icon ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconTheme', () =>
        {
            test( 'should be "control" by default', () =>
            {
                expect( instance.props.iconTheme ).toBe( 'control' );
            } );

            test( 'should be passed to the Icon as theme', () =>
            {
                wrapper.setProps( { iconTheme: 'light' } );
                expect( wrapper.find( Icon ).prop( 'theme' ) ).toBe( 'light' );
            } );
        } );

        describe( 'iconSize', () =>
        {
            test( 'should be "S" by default', () =>
            {
                expect( instance.props.iconSize ).toBe( 'S' );
            } );

            test( 'should be passed to the Icon as size', () =>
            {
                wrapper.setProps( { iconSize: 'L' } );
                expect( wrapper.find( Icon ).prop( 'size' ) ).toBe( 'L' );
            } );
        } );

        describe( 'iconType', () =>
        {
            test( 'should be undefiend by default', () =>
            {
                expect( instance.props.iconType ).toBeUndefined();
            } );

            test( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );
                expect( wrapper.find( Icon ).prop( 'type' ) ).toBe( 'add' );
            } );
        } );
    } );
} );

describe( 'IconButtonDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <IconButton /> );
        driver  = wrapper.driver();
    } );

    describe( 'click', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
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
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
click since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

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


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
click since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                } );

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


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
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
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
blur since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.blur() ).toThrow( expectedError );
            } );

            test( 'should not trigger onBlur when isDisabled', () =>
            {
                const onBlur = jest.fn();
                wrapper.setProps( {
                    onBlur,
                    isDisabled : true,
                    label      : 'Tekeli-li',
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
        test( 'should trigger onFocus callback prop once', () =>
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
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
focus since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.focus() ).toThrow( expectedError );
            } );

            test( 'should not trigger onFocus when isDisabled', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( {
                    onFocus,
                    isDisabled : true,
                    label      : 'Tekeli-li',
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
} );
