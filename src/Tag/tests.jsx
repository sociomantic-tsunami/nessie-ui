/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React      from 'react';
import { mount }  from 'enzyme';

import IconButton from '../IconButton';

import Tag        from './index';


describe( 'Tag', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Tag /> );
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
        beforeEach( () =>
        {
            wrapper = mount( <Tag isReadOnly /> );
        } );

        test( 'should have an IconButton as a child with isReadOnly set', () =>
        {
            expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
            expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                .toBeTruthy();
        } );
    } );

    test( 'should have an IconButton with close icon as a child', () =>
    {
        expect( wrapper.find( IconButton ).prop( 'iconType' ) ).toBe( 'close' );
    } );

    test( 'should have a string as a label when prop label is passed', () =>
    {
        const label = 'Tag Label';
        const props = {
            label
        };
        wrapper = mount( <Tag { ...props } /> );
        expect( wrapper.text() ).toBe( label );
    } );

    test( 'should trigger onClick callbacks when IconButton clicked', () =>
    {
        const callBack = jest.fn();
        const props = {
            onClick : callBack
        };
        wrapper = mount( <Tag { ...props } /> );
        wrapper.driver().clickClose();
        expect( callBack ).toBeCalled();
    } );
} );
