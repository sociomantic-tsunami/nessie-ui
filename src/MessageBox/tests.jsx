/* global test */
/* eslint-disable no-magic-numbers */

import React       from 'react';
import { shallow } from 'enzyme';

import { Text }    from '../index';

import MessageBox  from './index';


describe( 'MessageBox', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <MessageBox /> );
    } );

    test( 'should contain a Text component when message is set', () =>
    {
        wrapper.setProps( { message: 'hallo' } );
        expect( wrapper.find( Text ) ).toHaveLength( 1 );
    } );
} );
