/* eslint-disable no-magic-numbers  */

import React                from 'react';
import { mount }            from 'enzyme';

import ProgressIndicator    from './index';

describe( 'ProgressIndicator', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ProgressIndicator /> );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
    test( 'should contain a ProgressIndicator', () =>
    {
        expect( wrapper.find( ProgressIndicator ) ).toHaveLength( 1 );
    } );
} );
