/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import H1          from './index';


describe( 'H1', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <H1 /> );
    } );

    test( 'should contain a <h1> element', () =>
    {
        expect( wrapper.find( 'h1' ) ).toHaveLength( 1 );
    } );
} );
