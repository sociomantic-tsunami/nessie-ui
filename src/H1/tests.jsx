/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import { H1 }       from '../index';
import styles       from './h1.css';

describe( 'H1', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <H1 cssMap = { styles } /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
