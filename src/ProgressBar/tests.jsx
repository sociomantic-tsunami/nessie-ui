/* eslint-disable no-magic-numbers  */

import React        from 'react';
import { mount }    from 'enzyme';

import ProgressBar  from './index';

describe( 'ProgressBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ProgressBar /> );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );
    test( 'should contain a ProgressBar', () =>
    {
        expect( wrapper.find( ProgressBar ) ).toHaveLength( 1 );
    } );
} );
