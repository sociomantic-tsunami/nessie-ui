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

import { Sorter }   from '../index';

describe( 'Sorter', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
    } );

    test( 'should render <Sorter/>', () =>
    {
        expect( wrapper.find( Sorter ) ).toHaveLength( 1 );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.instance().context.Sorter.default}` )
            .first() ).toHaveLength( 1 );
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
        wrapper.setProps( {
            onToggle,
        } );

        driver.click();
        expect( onToggle ).toBeCalledTimes( 1 );
    } );
} );
