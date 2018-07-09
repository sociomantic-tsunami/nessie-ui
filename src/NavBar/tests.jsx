/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/


import React        from 'react';
import { mount }    from 'enzyme';

import NavBar       from './index';

describe( 'NavBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavBar /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );
