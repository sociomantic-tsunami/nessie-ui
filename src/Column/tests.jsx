/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';


import Column       from './index';

describe( 'Column', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Column /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.column__default' ) ).to.have.length( 1 );
    } );

    describe( 'Driver self-test', () =>
    {
        it( 'getContent', () =>
        {
            Wrapper = mount( <Column><h2>Lightning Strike</h2></Column> );

            const content = Wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() )
                .to.equal( 'Lightning Strike' );
        } );
    } );
} );
