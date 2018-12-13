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

import { NavBar }   from '../index';

describe( 'NavBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavBar /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper
            .find( `.${wrapper.instance().context.NavBar.default}` ).first() )
            .toHaveLength( 1 );
    } );
} );
