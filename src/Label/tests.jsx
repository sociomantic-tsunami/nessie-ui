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

import Label       from './index';


describe( 'Label', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Label /> );
    } );

    test( 'should contain a single label element', () =>
    {
        expect( wrapper.find( 'label' ) ).toHaveLength( 1 );
    } );
} );
