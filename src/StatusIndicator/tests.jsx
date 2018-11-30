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

import React               from 'react';
import { shallow }         from 'enzyme';

import { StatusIndicator } from '../index';


describe( 'StatusIndicator', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <StatusIndicator /> );
    } );

    test( 'should contain the label text', () =>
    {
        wrapper.setProps( { label: 'hallo' } );
        expect( wrapper.text() ).toBe( 'hallo' );
    } );
} );
