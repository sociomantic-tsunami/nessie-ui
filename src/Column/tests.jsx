/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';


import Column       from './index';

describe( 'Column', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Column /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    describe( 'Driver self-test', () =>
    {
        test( 'getContent', () =>
        {
            wrapper = mount( <Column><h2>Lightning Strike</h2></Column> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h2' ).text() ).toBe( 'Lightning Strike' );
        } );
    } );
} );
