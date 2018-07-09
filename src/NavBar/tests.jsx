/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str*/


import React                      from 'react';
import { mount }                  from 'enzyme';


import NavBar                     from './index';

describe( 'NavBar', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <NavBar /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.navBar__default' ) ).to.have.length( 1 );
    } );
} );
