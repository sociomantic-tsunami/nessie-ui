/* global test */
/* eslint-disable no-magic-numbers*/

import React       from 'react';
import { shallow } from 'enzyme';

import Label       from './index';


describe( 'Label', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Label /> );
    } );

    test( 'should contain a single label element', () =>
    {
        expect( wrapper.find( 'label' ) ).toHaveLength( 1 );
    } );
} );
