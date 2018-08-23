/* eslint-disable no-magic-numbers, no-multi-str */

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
} );
