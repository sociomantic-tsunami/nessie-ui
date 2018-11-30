/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import styles       from './column.css';
import { Column }   from '../index';


describe( 'ColumnDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Column cssMap = { styles } /> );
    } );

    describe( 'Driver self-test', () =>
    {
        test( 'getContent', () =>
        {
            wrapper = mount( <Column><h2>Lightning Strike</h2></Column> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
