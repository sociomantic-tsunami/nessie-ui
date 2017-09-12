/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers*/


import React                      from 'react';
import { mount }                  from 'enzyme';


import NavDropdown                from './index';

describe( 'NavDropdown', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <NavDropdown /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.navDropdown__default' ) ).to.have.length( 1 );
    } );
} );
