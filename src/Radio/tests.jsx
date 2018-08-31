/* global test jest */
/* eslint-disable no-magic-numbers, no-unused-expressions */

import React       from 'react';
import { shallow } from 'enzyme';

import Checkable   from '../proto/Checkable';

import Radio       from './index';


describe( 'Radio', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Radio /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .toBe( true );
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .toBe( true );
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .toBe( true );
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                const onChange = jest.fn();
                wrapper.setProps( { onChange } );

                expect( wrapper.find( Checkable ).prop( 'onChange' ) )
                    .toBe( onChange );
            } );
        } );
    } );
} );
