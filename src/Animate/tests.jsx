/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* eslint no-console: 0*/
/* global expect */


import React        from 'react';
import { mount }    from 'enzyme';

import Animate      from './index';

describe( 'Animate', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Animate /> );
    } );

    it( 'should contain a Animate component', () =>
    {
        expect( Wrapper.find( Animate ) ).to.have.length( 1 );
    } );

    it( 'should have animate__default as default className', () =>
    {
        expect( Wrapper.find( '.animate__default' ) ).to.have.length( 1 );
    } );

    it( 'should have class animate__fadeIn__fadeOut if fadeIn and fadeOut \
        props are selected',
        () =>
        {
            const props = {
                enterAnimation : 'fadeIn',
                outAnimation   : 'fadeOut'
            };

            Wrapper = mount( <Animate { ...props } /> );

            expect( Wrapper.find( '.animate__fadeIn__fadeOut' ) )
                .to.have.length( 1 );
        } );
} );
