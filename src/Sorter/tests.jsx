/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */

import React        from 'react';
import { mount }    from 'enzyme';

import { Sorter }   from '../index';
import styles       from './sorter.css';


describe( 'SorterDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Sorter cssMap = { styles } /> );
    } );

    test( 'should call onToggle callback function', () =>
    {
        const onToggle = jest.fn();
        wrapper.setProps( { onToggle } );

        wrapper.driver().toggle();
        expect( onToggle ).toBeCalled();
    } );
} );
