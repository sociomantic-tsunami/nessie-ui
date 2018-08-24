/* eslint-disable no-magic-numbers, no-multi-str */


import React        from 'react';
import { mount }    from 'enzyme';

import Animate      from './index';

describe( 'Animate', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Animate /> );
    } );

    test( 'should contain an Animate component', () =>
    {
        expect( wrapper.find( Animate ) ).toHaveLength( 1 );
    } );

    test( 'should have animate__default as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should have class animate__fadeIn__fadeOut if fadeIn and fadeOut \
props are selected', () =>
    {
        const props = {
            enterAnimation : 'fadeIn',
            outAnimation   : 'fadeOut',
        };

        wrapper = mount( <Animate { ...props } /> );

        expect( wrapper.find( '.animate__fadeIn__fadeOut' ) ).toHaveLength( 1 );
    } );
} );
