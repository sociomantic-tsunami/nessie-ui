/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React        from 'react';
import { mount }    from 'enzyme';


import H2           from './index';

describe( 'H2', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <H2 /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.h2__default' ) ).to.have.length( 1 );
    } );
} );
