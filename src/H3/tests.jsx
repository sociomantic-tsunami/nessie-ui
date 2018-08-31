/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import H3          from './index';


describe( 'H3', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <H3 /> );
    } );

    test( 'should contain a <h3> element', () =>
    {
        expect( wrapper.find( 'h3' ) ).toHaveLength( 1 );
    } );
} );
