/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React           from 'react';
import { shallow }     from 'enzyme';

import { InputField }  from '../index';
import InputContainer  from '../proto/InputContainer';
import Css             from '../hoc/Css';

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
        it( 'should have name ValuedTextInput', () =>
        {
            expect( instance.constructor.name ).to.equal( 'ValuedTextInput' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).to.have.length( 1 );
        } );

        it( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).to.have.length( 1 );
        } );
    } );
} );
