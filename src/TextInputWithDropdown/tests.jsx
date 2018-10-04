/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React                             from 'react';
import { shallow }                       from 'enzyme';

import { InputField, FlounderDropdown }  from '../index';
import InputContainer                    from '../proto/InputContainer';

import TextInputWithDropdown             from './index';


describe( 'TextInputWithDropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithDropdown /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one FlounderDropdown', () =>
        {
            expect( wrapper.find( FlounderDropdown ) ).toHaveLength( 1 );
        } );
    } );
} );
