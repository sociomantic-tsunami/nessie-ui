/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers*/

import React                      from 'react';
import { mount }                  from 'enzyme';


import NavList                    from './index';

describe( 'NavList', () =>
{
    let Wrapper;

    beforeEach( () =>
{
        Wrapper = mount( <NavList /> );
    } );

    it( 'should have its component name and hash as default className', () =>
{
        expect( Wrapper.find( '.navList__default' ) ).to.have.length( 1 );
    } );
} );
