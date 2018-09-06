/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global test jest */

import React      from 'react';
import { mount }  from 'enzyme';

import RadioGroup from './index';

describe( 'RadioGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <RadioGroup /> );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
