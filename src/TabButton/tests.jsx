/* global test jest */

import React            from 'react';
import { mount }        from 'enzyme';

import { TabButton }    from '../index';


describe( 'TabButton', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <TabButton /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should render exactly one TabButton', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );
} );

describe( 'TabButton Driver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <TabButton /> );
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            wrapper.driver().click();

            expect( onClick ).toBeCalled();
        } );

        test( 'should return error if disabled', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { isDisabled: true, onClick } );

            expect( () => wrapper.driver().click() ).toThrowError( 'Button \
cannot be clicked because it is disabled' );
        } );
    } );
} );
