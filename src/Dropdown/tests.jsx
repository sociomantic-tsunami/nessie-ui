/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';


import Dropdown     from './index';

describe( 'Dropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Dropdown /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( '.dropdown__default' ) ).to.have.length( 1 );
    } );

    describe( 'Wrapper driver getContent', () =>
    {
        it( 'should return the dropdown content', () =>
        {
            wrapper = mount( <Dropdown><p>Lightning Strike</p></Dropdown> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'p' ).text() )
                .to.equal( 'Lightning Strike' );
        } );
    } );
} );
