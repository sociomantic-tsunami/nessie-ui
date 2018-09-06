/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import H4          from './index';


describe( 'H4', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <H4 /> );
    } );

    test( 'should contain a <h4> element', () =>
    {
        expect( wrapper.find( 'h4' ) ).toHaveLength( 1 );
    } );
} );
