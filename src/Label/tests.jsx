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
/* eslint-disable no-magic-numbers*/

import React        from 'react';
import { mount }    from 'enzyme';

import Label        from './index';

describe( 'Label', () =>
{
    let wrapper;
    const props = {
        label : 'Boom'
    };
    beforeEach( () =>
    {
        wrapper = mount( <Label { ...props } /> );
    } );

    test( 'should contain a single label element', () =>
    {
        expect( wrapper.find( 'label' ) ).toHaveLength( 1 );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );
