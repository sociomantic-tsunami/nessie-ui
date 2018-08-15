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
                    .toBeTruthy();
            } );
        } );

        describe( 'hasError', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { hasError: true } );

                expect( wrapper.find( Checkable ).prop( 'hasError' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'forceHover', () =>
        {
            test( 'should be passed to the Checkable', () =>
            {
                wrapper.setProps( { forceHover: true } );

                expect( wrapper.find( Checkable ).prop( 'forceHover' ) )
                    .toBeTruthy();
            } );
        } );

        describe( 'onChange', () =>
        {
            test( 'should be `undefined` if readOnly', () =>
            {
                const onChange = jest.fn().mockImplementation( e =>
                    targetChecked = e.target.checked );
                wrapper.setProps( { isReadOnly: true, onChange } );

                expect( wrapper.prop( onChange ) ).toBeUndefined();
            } );

            test(
                'should be passed as `undefined` to Checkable if readOnly',
                () =>
                {
                    const onChange = jest.fn().mockImplementation( e =>
                        targetChecked = e.target.checked );
                    wrapper.setProps( { isReadOnly: true, onChange } );

                    expect( wrapper.find( Checkable ).prop( onChange ) )
                        .toBeUndefined();
                },
            );

            test( 'should be defined if not readOnly', () =>
            {
                const onChange = jest.fn().mockImplementation( e =>
                    targetChecked = e.target.checked );
                wrapper.setProps( { onChange } );

                expect( wrapper.prop( onChange ) )
                    .toBe( wrapper.instance().onChange );
            } );
        } );
    } );
} );
