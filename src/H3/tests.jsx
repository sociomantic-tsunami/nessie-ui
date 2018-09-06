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

import H3          from './index';


describe( 'H3', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <H3 /> );
    } );

    test( 'should contain a <h3> element', () =>
    {
        expect( wrapper.find( 'h3' ) ).toHaveLength( 1 );
    } );
} );
