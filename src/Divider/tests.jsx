/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Divider      from './index';

describe( 'Divider', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Divider /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
