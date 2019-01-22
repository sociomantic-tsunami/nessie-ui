/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React       from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '..';

describe( 'Spinner', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Spinner /> );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );
