/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import NavList     from './index';


describe( 'NavList', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <NavList /> );
    } );

    test( 'should contain a <ul> element', () =>
    {
        expect( wrapper.find( 'ul' ) ).toHaveLength( 1 );
    } );
} );
