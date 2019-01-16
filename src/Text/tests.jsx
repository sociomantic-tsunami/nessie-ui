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

import { Text }           from '../index';


describe( 'Text', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Text /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );


describe( 'TextDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Text /> );
        driver  = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        test( 'should call onClick exactly once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );
} );
