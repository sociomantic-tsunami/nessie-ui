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

import { Sorter }         from '../index';


describe( 'Sorter', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Sorter /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );


describe( 'SorterDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
        driver  = wrapper.driver();
    } );

    test( 'should call onToggle callback function once', () =>
    {
        const onToggle = jest.fn();
        wrapper.setProps( { onToggle } );

        driver.click();
        expect( onToggle ).toBeCalledTimes( 1 );
    } );
} );
