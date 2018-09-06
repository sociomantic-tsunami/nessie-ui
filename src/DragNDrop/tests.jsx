/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global test */

import React            from 'react';
import { mount }        from 'enzyme';

import { Text }         from '../index';

import DragNDrop        from './index';


describe( 'DragNDrop', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <DragNDrop /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one DragNDrop', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'wrapperDriver', () =>
    {
        test( 'should find content', () =>
        {
            wrapper.setProps( { children: <Text>something</Text> } );
            expect( wrapper.driver().getContent() ).toHaveLength( 1 );
        } );
    } );
} );
