/* eslint-env node, mocha */
/* global expect document */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */

import React                             from 'react';
import { shallow }                       from 'enzyme';

import { InputField, FlounderDropdown }  from '../index';
import InputContainer                    from '../proto/InputContainer';
import Css                               from '../hoc/Css';

import TextInputWithDropdown             from './index';


describe( 'TextInputWithDropdown', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInputWithDropdown /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name TextInputWithDropdown', () =>
        {
            expect( instance.constructor.name )
                .to.equal( 'TextInputWithDropdown' );
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

        it( 'should contain exactly one FlounderDropdown', () =>
        {
            expect( wrapper.find( FlounderDropdown ) ).to.have.length( 1 );
        } );
    } );
} );
