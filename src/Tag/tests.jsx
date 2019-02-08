/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                      from 'react';
import { mount, shallow }         from 'enzyme';

import { IconButton, Tag, Text }  from '../index';


describe( 'Tag', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Tag /> );
    } );

    test( 'should have “default” as default className', () =>
    {
        expect( wrapper.prop( 'className' ) ).toEqual( 'default' );
    } );

    test( 'should have an IconButton as a child', () =>
    {
        expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
    } );

    describe( 'read-only state', () =>
    {
        test( 'should have an IconButton as a child with isReadOnly set', () =>
        {
            wrapper.setProps( { isReadOnly: true } );

            expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
            expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                .toBeTruthy();
        } );
    } );

    test( 'should have an IconButton with control theme and close icon as a \
child', () =>
    {
        expect( wrapper.find( IconButton ).props().iconType ).toBe( 'x' );
    } );

    test( 'should have a string as a label when prop label is passed', () =>
    {
        const label = 'Tag Label';
        wrapper.setProps( {
            label,
        } );

        expect( wrapper.find( Text ).prop( 'children' ) ).toBe( label );
    } );
} );

describe( 'TagDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Tag /> );
    } );

    describe( 'clickClose()', () =>
    {
        test( 'should trigger onClickClose callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
            } );

            wrapper.driver().clickClose();
            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );
} );
