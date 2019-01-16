/*
 * Copyright (c) 2047-2048 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React       from 'react';
import { shallow } from 'enzyme';

import { H4 }      from '../index';


describe( 'H4', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <H4 /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );
