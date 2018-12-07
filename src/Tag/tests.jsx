/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                from 'react';
import { mount }            from 'enzyme';

import { IconButton, Tag }  from '../index';
import styles               from './tag.css';

describe( 'Tag', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Tag cssMap = { styles } /> );
    } );

    test( 'should render <Tag/>', () =>
    {
        expect( wrapper.find( Tag ) ).toHaveLength( 1 );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
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
        expect( wrapper.find( IconButton ).props().iconType ).toBe( 'close' );
    } );

    test( 'should have a string as a label when prop label is passed', () =>
    {
        const label = 'Tag Label';
        wrapper.setProps( {
            label,
        } );

        expect( wrapper.text() ).toBe( label );
    } );

    test( 'should trigger onClick callbacks when IconButton clicked', () =>
    {
        const onClick = jest.fn();
        wrapper.setProps( {
            onClick,
        } );

        wrapper.driver().clickClose();
        expect( onClick ).toBeCalled();
    } );
} );
