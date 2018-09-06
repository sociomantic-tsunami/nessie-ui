/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global test */

import React       from 'react';
import { shallow } from 'enzyme';

import SpriteMap   from './index';


describe( 'SpriteMap', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <SpriteMap /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should dangerously set inner HTML', () =>
        {
            expect( wrapper.prop( 'dangerouslySetInnerHTML' ) ).toBeDefined();
        } );
    } );
} );
