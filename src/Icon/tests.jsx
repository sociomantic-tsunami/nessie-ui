/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import Icon        from './index';


describe( 'Icon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Icon /> );
        instance = wrapper.instance();
    } );

    test( 'should have size S by default', () =>
    {
        expect( instance.props.size ).toBe( 'S' );
    } );
} );
