/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import { NavItem }  from '../index';
import styles       from './navItem.css';

describe( 'NavItem', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        const props = {
            label : 'testLabel',
        };

        wrapper = mount( <NavItem cssMap = { styles } { ...props } /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );


describe( 'NavItemDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        const props = {
            label : 'Cthulhu',
        };

        wrapper = mount(  <NavItem { ...props } /> );
        driver = wrapper.driver();
    } );


    test( 'should trigger onClick callback once', () =>
    {
        const onClickSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onClick : onClickSpy,
        } );

        driver.click();
        expect( onClickSpy ).toBeCalledTimes( 1 );
    } );

    test( 'should trigger onMouseOver callback once', () =>
    {
        const onMouseOverSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onMouseOver : onMouseOverSpy,
        } );

        driver.mouseOver();
        expect( onMouseOverSpy ).toBeCalledTimes( 1 );
    } );

    test( 'should trigger onMouseOut callback once', () =>
    {
        const onMouseOutSpy = jest.fn().mockReset();
        wrapper.setProps( {
            onMouseOut : onMouseOutSpy,
        } );

        driver.mouseOut();
        expect( onMouseOutSpy ).toBeCalledTimes( 1 );
    } );
} );
