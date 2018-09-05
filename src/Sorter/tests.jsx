/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Sorter       from './index';

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
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );

describe( 'SorterDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter /> );
    } );

    test( 'should call onToggle callback function', () =>
    {
        const onToggle = jest.fn();
        wrapper.setProps( {
            onToggle
        } );

        wrapper.driver().toggle();

        expect( onToggle ).toBeCalled();
    } );
} );
