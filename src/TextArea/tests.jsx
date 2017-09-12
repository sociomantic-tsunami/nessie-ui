/* eslint-env node, mocha */
/* global expect document */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React          from 'react';
import { shallow }    from 'enzyme';

import { InputField } from '../index';
import InputContainer from '../proto/InputContainer';
import Css            from '../hoc/Css';

import TextInput      from './index';


describe( 'TextInput', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextInput /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name TextArea', () =>
        {
            expect( instance.constructor.name ).to.equal( 'TextArea' );
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

        it( 'InputField should have element="textarea"', () =>
        {
            expect( wrapper.find( InputField ).prop( 'element' ) )
                .to.equal( 'textarea' );
        } );
    } );
} );
