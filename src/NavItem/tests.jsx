/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React     from 'react';
import { mount } from 'enzyme';

import NavItem   from './index';


describe( 'NavItemDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NavItem /> );
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop', () =>
        {
            const onClick = jest.fn().mockReset();
            wrapper.setProps( { onClick } );

            wrapper.driver().click();

            expect( onClick ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop', () =>
        {
            const onMouseOver = jest.fn().mockReset();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop', () =>
        {
            const onMouseOut = jest.fn().mockReset();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getLabel()', () =>
    {
        test( 'should return the content of component label', () =>
        {
            wrapper.setProps( { label: <span>test label</span> } );

            const label = wrapper.driver().getLabel();

            expect( label.text() ).toBe( 'test label' );
        } );
    } );
} );
