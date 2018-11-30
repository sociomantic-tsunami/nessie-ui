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

import React                from 'react';
import { shallow }          from 'enzyme';

import { MessageBox, Text } from '../index';


describe( 'MessageBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <MessageBox /> );
    } );

    test( 'should contain a Text component when message is set', () =>
    {
        wrapper.setProps( { message: 'hallo' } );
        expect( wrapper.find( Text ) ).toHaveLength( 1 );
    } );
} );
