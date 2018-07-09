/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Divider      from './index';

describe( 'Divider', () =>
{
    let Wrapper;

    beforeEach( () =>
    {
        Wrapper = mount( <Divider /> );
    } );

    it( 'should have its component name and hash as default className', () =>
    {
        expect( Wrapper.find( '.divider__default' ) ).to.have.length( 1 );
    } );
} );
