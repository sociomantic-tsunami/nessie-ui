/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React       from 'react';
import { mount }   from 'enzyme';

import { Tab }     from '../index';

describe( 'TabDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper  = mount( <Tab /> );
        driver  = wrapper.driver();
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback function', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalled();
        } );
    } );
} );
