/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import NavBar      from './index';


describe( 'NavBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NavBar /> );
    } );

    test( 'should contain a <nav> element', () =>
    {
        expect( wrapper.find( 'nav' ) ).toHaveLength( 1 );
    } );
} );
