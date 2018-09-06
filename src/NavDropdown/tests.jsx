/* global test */
/* eslint-disable no-magic-numbers*/

import React       from 'react';
import { mount }   from 'enzyme';

import { NavList } from '../index';

import NavDropdown from './index';

describe( 'NavDropdown', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavDropdown /> );
    } );

    test( 'should contain exactly one NavList', () =>
    {
        expect( wrapper.find( NavList ) ).toHaveLength( 1 );
    } );
} );
