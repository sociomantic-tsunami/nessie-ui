/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React        from 'react';
import { mount }    from 'enzyme';

import H1           from './index';

describe( 'H1', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <H1 /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.h1__default' ) ).to.have.length( 1 );
    } );
} );
