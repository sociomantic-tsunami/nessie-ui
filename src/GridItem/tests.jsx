/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React      from 'react';
import { mount }  from 'enzyme';

import GridItem   from './index';


describe( 'GridItemDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <GridItem>dummy text</GridItem> );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );
} );
