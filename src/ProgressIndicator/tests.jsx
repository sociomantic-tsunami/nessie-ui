/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers  */

import React                from 'react';
import { mount }            from 'enzyme';

import ProgressIndicator    from './index';

describe( 'ProgressIndicator', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ProgressIndicator /> );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
    test( 'should contain a ProgressIndicator', () =>
    {
        expect( wrapper.find( ProgressIndicator ) ).toHaveLength( 1 );
    } );
} );
