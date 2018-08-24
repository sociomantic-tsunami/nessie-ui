/* eslint-disable no-magic-numbers, no-multi-str */


import React        from 'react';
import { mount }    from 'enzyme';

import H2           from './index';

describe( 'H2', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <H2 /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
} );
