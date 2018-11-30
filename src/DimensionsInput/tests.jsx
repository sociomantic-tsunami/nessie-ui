/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers */


import React                                 from 'react';
import { shallow }                           from 'enzyme';

import { DimensionsInput, InputField, Text } from '../index';


describe( 'DimensionsInput', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <DimensionsInput /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly two InputFields', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 2 );
        } );

        it( 'should contain exactly one Text', () =>
        {
            expect( wrapper.find( Text ) ).toHaveLength( 1 );
        } );
    } );
} );
