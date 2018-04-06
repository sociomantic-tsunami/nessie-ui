/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React         from 'react';
import { mount }     from 'enzyme';

import ScrollBox     from './index';

describe( 'ScrollBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = null;
    } );

    it( 'should contain a single ScrollBox', () =>
    {
        const props = {
            title : 'Boom'
        };
        wrapper = mount( <ScrollBox { ...props } /> );

        expect( wrapper.find( ScrollBox ) ).to.have.length( 1 );
        expect( wrapper.find( ScrollBox ) ).to.not.have.length( 2 );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        const props = {
            title : 'Boom'
        };

        wrapper = mount( <ScrollBox { ...props } /> );
        expect( wrapper.find( '.scrollBox__default' ) ).to.have.length( 1 );
    } );
} );


describe.only( 'ScrollBoxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBox scrollUpIsVisible = "true" /> );
    } );

    it( 'should trigger onClick when clicked', () =>
    {
        const onClickScrollUp = sinon.spy();

        wrapper.props( {
            onClickScrollUp
        } );

        console.log( wrapper.find( 'IconButton' ).first().debug() );
        wrapper.driver().click();

        expect( onClickScrollUp.calledOnce ).to.be.true;
    } );
} );
