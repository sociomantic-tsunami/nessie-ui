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

    describe( 'click()', () =>
    {
        test( 'should fire the onClick callback prop exactly once', () =>
        {
            const clickSpy = jest.fn();
            wrapper.setProps( { onClick: clickSpy } );

            driver.click();
            expect( clickSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'focus()', () =>
    {
        test( 'should fire the onFocus callback prop once', () =>
        {
            const focusSpy = jest.fn();
            wrapper.setProps( { onFocus: focusSpy } );

            driver.focus();
            expect( focusSpy ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'blur()', () =>
    {
        test( 'should fire the onBlur callback prop once', () =>
        {
            const blurSpy = jest.fn();
            wrapper.setProps( { onBlur: blurSpy } );

            driver.blur();
            expect( blurSpy ).toBeCalledTimes( 1 );
        } );
    } );
} );
