/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import H2          from './index';


describe( 'H2', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <H2 /> );
    } );

    test( 'should contain a <h2> element', () =>
    {
        expect( wrapper.find( 'h2' ) ).toHaveLength( 1 );
    } );
} );
