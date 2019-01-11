/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                    from 'react';
import { mount }                from 'enzyme';

import { NavDropdown, NavList } from '../index';

describe( 'NavDropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavDropdown /> );
    } );

    test( 'should contain exactly one NavList', () =>
    {
        expect( wrapper.find( NavList ) ).toHaveLength( 1 );
    } );
} );
