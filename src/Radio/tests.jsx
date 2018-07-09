/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
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

        describe( 'onChange', () =>
        {
            it( 'should be `undefined` if readOnly', () =>
            {
                const onChange = sinon.stub().callsFake( e =>
                    targetChecked = e.target.checked
                );
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.prop( onChange ) )
                    .to.equal( undefined );
            } );

            it( 'should be passed as `undefined` to Checkable if readOnly',
                () =>
                {
                    const onChange = sinon.stub().callsFake( e =>
                        targetChecked = e.target.checked
                    );
                    wrapper.setProps( { isReadOnly: true, onChange } );

                    expect( wrapper.find( Checkable ).prop( onChange ) )
                        .to.equal( undefined );
                } );

            it( 'should be defined if not readOnly', () =>
            {
                const onChange = sinon.stub().callsFake( e =>
                    targetChecked = e.target.checked
                );
                wrapper.setProps( { onChange } );

                expect( wrapper.prop( onChange ) )
                    .to.equal( wrapper.instance().onChange );
            } );
        } );
    } );
} );
