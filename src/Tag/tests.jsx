/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React                      from 'react';
import { mount }                  from 'enzyme';

import IconButton                 from '../IconButton';

import Tag                        from './index';


describe( 'Tag', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Tag /> );
    } );

    it( 'should render <Tag/>', () =>
    {
        expect( Wrapper.find( Tag ) ).to.have.length( 1 );
    } );

    it( 'should have its component name as default className', () =>
    {
        expect( Wrapper.find( '.tag__default' ) ).to.have.length( 1 );
    } );

    it( 'should have an IconButton as a child', () =>
    {
        expect( Wrapper.find( IconButton ) ).to.have.length( 1 );
    } );

    describe( 'read-only state', () =>
    {
        beforeEach( () =>
        {
            Wrapper = mount( <Tag isReadOnly /> );
        } );

        it( 'should have an IconButton as a child with isReadOnly set', () =>
        {
            expect( Wrapper.find( IconButton ) ).to.have.length( 1 );
            expect( Wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                .to.be.true;
        } );
    } );

    it( 'should have an IconButton with control theme and close icon as a \
child', () =>
    {
        expect( Wrapper.find( IconButton ).props().iconTheme )
            .to.equal( 'control' );
        expect( Wrapper.find( IconButton ).props().iconType )
            .to.equal( 'close' );
    } );

    it( 'should have a string as a label when prop label is passed', () =>
    {
        const label = 'Tag Label';
        const props = {
            label
        };
        Wrapper = mount( <Tag { ...props } /> );
        expect( Wrapper.text() ).to.be.equal( label );
    } );

    it( 'should trigger onClick callbacks when IconButton clicked', () =>
    {
        const callBack = sinon.spy();
        const props = {
            onClick : callBack
        };
        Wrapper = mount( <Tag { ...props } /> );
        Wrapper.find( IconButton ).simulate( 'click' );
        expect( callBack.calledOnce ).to.equal( true );
    } );
} );
