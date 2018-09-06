/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import { Required } from '../index';

describe( 'Required', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <Required /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Required', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isRequired', () =>
        {
            test( 'should be "true" by default', () =>
            {
                expect( wrapper.prop( 'isRequired' ) ).toBeTruthy();
            } );
        } );
    } );
} );
