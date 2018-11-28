/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers*/

import React       from 'react';
import { shallow } from 'enzyme';

import NavList     from './index';


describe( 'NavList', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NavList /> );
    } );

    test( 'should contain a <ul> element', () =>
    {
        expect( wrapper.find( 'ul' ) ).toHaveLength( 1 );
    } );
} );
