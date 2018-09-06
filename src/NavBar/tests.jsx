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

import React       from 'react';
import { shallow } from 'enzyme';

import NavBar      from './index';


describe( 'NavBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NavBar /> );
    } );

    test( 'should contain a <nav> element', () =>
    {
        expect( wrapper.find( 'nav' ) ).toHaveLength( 1 );
    } );
} );
