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

import { Spinner }  from '../index';

describe( 'Spinner', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Spinner /> );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.instance().context.Spinner
            .default}` ) ).toHaveLength( 1 );
    } );
    test( 'should contain a Spinner', () =>
    {
        expect( wrapper.find( Spinner ) ).toHaveLength( 1 );
    } );
} );
