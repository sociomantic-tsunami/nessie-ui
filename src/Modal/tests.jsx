/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import { Modal }          from '..';


describe( 'Modal', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Modal /> );
    } );

    test( 'should contain child elements', () =>
    {
        wrapper.setProps( {
            children : <span className = "thisguy">boom</span>,
        } );

        const children = wrapper.find( '.content' ).children();
        expect( children.html() ).toBe( '<span class="thisguy">boom</span>' );
    } );
} );


describe( 'ModalDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Modal /> );
    } );

    test(
        'should trigger `onClickOverlay` once callback when overlay clicked',
        () =>
        {
            const onClickOverlay = jest.fn();
            wrapper.setProps( { isVisible: true, onClickOverlay } );

            wrapper.driver().clickOverlay();
            expect( onClickOverlay ).toHaveBeenCalledTimes( 1 );
        },
    );
} );
