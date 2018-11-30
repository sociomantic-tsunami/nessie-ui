/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React                    from 'react';
import { shallow }              from 'enzyme';

import { InputField, TextArea } from '../index';
import styles                   from './textArea.css';


describe( 'TextArea', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextArea cssMap = { styles } /> );
    } );

    test( 'should contain exactly one InputField', () =>
    {
        expect( wrapper.find( InputField ) ).toHaveLength( 1 );
    } );

    test( 'InputField should have element="textarea"', () =>
    {
        expect( wrapper.find( InputField ).prop( 'element' ) )
            .toBe( 'textarea' );
    } );
} );
