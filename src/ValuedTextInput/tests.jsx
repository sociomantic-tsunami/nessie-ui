/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React           from 'react';
import { shallow }     from 'enzyme';

import { InputField }  from '../index';
import InputContainer  from '../proto/InputContainer';


import ValuedTextInput from './index';


describe( 'ValuedTextInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <ValuedTextInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name ValuedTextInput', () =>
        {
            expect( instance.constructor.name ).toBe( 'ValuedTextInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );
    } );
} );
