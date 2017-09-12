/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React        from 'react';
import { mount }    from 'enzyme';

import H3           from './index';

describe( 'H3', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <H3 /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.h3__default' ) ).to.have.length( 1 );
    } );
} );
