/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import { Dropdown } from '../index';
import styles       from './dropdown.css';

describe( 'Dropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Dropdown cssMap = { styles } /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should return the dropdown content', () =>
    {
        wrapper = mount( <Dropdown><p>Lightning Strike</p></Dropdown> );

        const content = wrapper.children();
        expect( content.find( 'p' ).text() ).toBe( 'Lightning Strike' );
    } );
} );
