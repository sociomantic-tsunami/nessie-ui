/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React        from 'react';
import { shallow }  from 'enzyme';

import GridItem     from './index';


describe( 'GridItem', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <GridItem>dummy text</GridItem> );
    } );

    describe( 'render()', () =>
    {
        test( 'should be rendered with `children` prop', () =>
        {
            wrapper.setProps( { children: 'Cthulhu' } );
            expect( wrapper.text() ).toEqual( 'Cthulhu' );
        } );
    } );
} );
