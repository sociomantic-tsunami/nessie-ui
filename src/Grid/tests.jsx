/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React            from 'react';
import { mount }        from 'enzyme';

import { Column, Grid } from '../index';

describe( 'Grid', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Grid /> );
    } );

    describe( 'render', () =>
    {
        test( 'should return the content of the Grid or Column', () =>
        {
            wrapper.setProps( { children: <Column>Lightning Strike</Column> } );
            expect( wrapper.text() ).toBe( 'Lightning Strike' );
        } );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
