/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React       from 'react';
import { shallow } from 'enzyme';

import { Icon }    from '..';

describe( 'Icon', () =>
{
    beforeEach( () =>
    {
        shallow( <Icon /> );
    } );

    test( 'should have size S by default', () =>
    {
        expect( Icon.defaultProps.size ).toBe( 'S' );
    } );
} );
