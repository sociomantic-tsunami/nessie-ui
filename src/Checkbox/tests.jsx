/* eslint-env node, mocha */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global expect */

import React       from 'react';
import { shallow } from 'enzyme';

import Checkable   from '../proto/Checkable';

import Checkbox    from './index';

describe( 'Checkbox', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Checkbox /> );
        instance = wrapper.instance();
    } );

    describe( 'constructor( props )', () =>
    {
        it( 'should have name Checkbox', () =>
        {
            expect( instance.constructor.name ).to.equal( 'Checkbox' );
        } );
    } );

    describe( 'render()', () =>
    {
        it( 'should contain exactly one Checkable', () =>
        {
            expect( wrapper.find( Checkable ) ).to.have.length( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isDisabled', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { isDisabled: true } );

                expect( wrapper.find( Checkable ).prop( 'isDisabled' ) )
                    .to.be.true;
            } );
        } );

        describe( 'hasError', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .to.be.true;
            } );
        } );

        describe( 'forceHover', () =>
        {
            it( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .to.be.true;
            } );
        } );
    } );
} );
