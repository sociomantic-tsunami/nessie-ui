/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import Spinner      from './index';

describe( 'Spinner', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Spinner /> );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
    test( 'should contain a Spinner', () =>
    {
        expect( wrapper.find( Spinner ) ).toHaveLength( 1 );
    } );
} );
