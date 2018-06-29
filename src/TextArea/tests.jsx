/* global test */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React            from 'react';
import { shallow }      from 'enzyme';

import { InputField }   from '../index';
import InputContainer   from '../proto/InputContainer';
import Css              from '../hoc/Css';

import TextArea         from './index';


describe( 'TextArea', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <TextArea /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        test( 'should have name TextArea', () =>
        {
            expect( instance.constructor.name ).toBe( 'TextArea' );
        } );
    } );

    describe( 'render()', () =>
    {
        test( 'should implement the Css injector component', () =>
        {
            expect( wrapper.find( Css ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputContainer', () =>
        {
            expect( wrapper.find( InputContainer ) ).toHaveLength( 1 );
        } );

        test( 'should contain exactly one InputField', () =>
        {
            expect( wrapper.find( InputField ) ).toHaveLength( 1 );
        } );

        test( 'InputField should have element="textarea"', () =>
        {
            expect( wrapper.find( InputField ).prop( 'element' ) )
                .toBe( 'textarea' );
        } );
    } );
} );
