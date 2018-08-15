/* eslint-disable no-magic-numbers*/

import React        from 'react';
import { mount }    from 'enzyme';

import NavList      from './index';

describe( 'NavList', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavList /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
