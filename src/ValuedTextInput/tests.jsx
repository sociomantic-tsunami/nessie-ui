/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React           from 'react';
import { shallow }     from 'enzyme';

import { InputField }  from '../index';

import ValuedTextInput from './index';


describe( 'ValuedTextInput', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <ValuedTextInput /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );
    } );
} );
