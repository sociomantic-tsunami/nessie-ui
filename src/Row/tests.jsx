/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import Row          from './index';

describe( 'Row', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Row /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.row__default' ) ).to.have.length( 1 );
    } );

    describe( 'Driver self-test', () =>
    {
        it( 'getContent', () =>
        {
            Wrapper = mount( <Row><h2>Lightning Strike</h2></Row> );

            const content = Wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() )
                        .to.equal( 'Lightning Strike' );
        } );
    } );
} );
