/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import Grid          from './index';

describe( 'Grid', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Grid /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.grid__default' ) ).to.have.length( 1 );
    } );

    describe( 'Driver self-test', () =>
    {
        it( 'getContent', () =>
        {
            Wrapper = mount( <Grid><h2>Lightning Strike</h2></Grid> );

            const content = Wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() )
                        .to.equal( 'Lightning Strike' );
        } );
    } );
} );
