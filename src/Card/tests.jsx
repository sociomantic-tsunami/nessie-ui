/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str */

import React        from 'react';
import { mount }    from 'enzyme';

import styles       from './card.css';

import Card         from './index';


describe( 'Card', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Card cssMap = { styles } /> );
    } );

    test(
        'should have same X and Y axis padding when padding prop is a string',
        () =>
        {
            wrapper.setProps( { padding: 'L' } );

            expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).paddingX__L}` ) )
                .toHaveLength( 1 );

            expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).paddingY__L}` ) )
                .toHaveLength( 1 );
        },
    );

    test( 'should have different X and Y axis padding when padding prop is a \
string', () =>
    {
        wrapper.setProps( { padding: [ 'M', 'L' ] } );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).paddingX__M}` ) )
            .toHaveLength( 1 );

        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).paddingY__L}` ) )
            .toHaveLength( 1 );
    } );
} );
