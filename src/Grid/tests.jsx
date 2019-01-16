/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React            from 'react';
import { shallow }      from 'enzyme';

import { Grid, Column } from '../index';

describe( 'Grid', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Grid /> );
    } );

    describe( 'render', () =>
    {
        test( 'should render the children of the Grid', () =>
        {
            wrapper.setProps( {
                children : [
                    <Column key = { 1 } />,
                    <Column key = { 2 } />,
                ],
            } );

            expect( wrapper.find( Column ) ).toHaveLength( 2 );
        } );
    } );

    test( 'should have “main” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'main' );
    } );
} );
