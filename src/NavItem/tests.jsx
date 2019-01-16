/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { NavItem }        from '../index';


describe( 'NavItem', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NavItem /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );


describe( 'NavItemDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <NavItem /> );
        driver = wrapper.driver();
    } );

    test( 'should trigger onClick callback once', () =>
    {
        const onClickSpy = jest.fn();
        wrapper.setProps( {
            onClick : onClickSpy,
        } );

        driver.click();
        expect( onClickSpy ).toBeCalledTimes( 1 );
    } );

    test( 'should trigger onMouseOver callback once', () =>
    {
        const onMouseOverSpy = jest.fn();
        wrapper.setProps( {
            onMouseOver : onMouseOverSpy,
        } );

        driver.mouseOver();
        expect( onMouseOverSpy ).toBeCalledTimes( 1 );
    } );

    test( 'should trigger onMouseOut callback once', () =>
    {
        const onMouseOutSpy = jest.fn();
        wrapper.setProps( {
            onMouseOut : onMouseOutSpy,
        } );

        driver.mouseOut();
        expect( onMouseOutSpy ).toBeCalledTimes( 1 );
    } );
} );
