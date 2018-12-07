/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                from 'react';
import { mount }            from 'enzyme';

import { DragNDrop, Text }  from '../index';
import styles               from './dragNDrop.css';

describe( 'DragNDrop', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <DragNDrop cssMap = { styles } /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one DragNDrop', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    test( 'should find content', () =>
    {
        wrapper.setProps( {
            children : <Text>something</Text>,
        } );

        expect( wrapper.children() ).toHaveLength( 1 );
    } );
} );
