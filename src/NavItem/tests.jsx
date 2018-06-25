/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React     from 'react';
import { mount } from 'enzyme';

import NavItem   from './index';

describe( 'NavItem', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        const props = {
            label : 'testLabel',
        };

        wrapper = mount( <NavItem { ...props } /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ) )
            .toHaveLength( 1 );
    } );

    test( 'should trigger callback on click', () =>
    {
        const onClickSpy = jest.fn();
        wrapper.setProps( {
            onClick : onClickSpy
        } );

        wrapper.driver().click();

        expect( onClickSpy ).toBeCalled();
    } );

    test( 'should trigger callback on mouse over', () =>
    {
        const onMouseOverSpy = jest.fn();
        wrapper.setProps( {
            onMouseOver : onMouseOverSpy
        } );

        wrapper.driver().mouseOver();

        expect( onMouseOverSpy ).toBeCalled();
    } );

    test( 'should trigger callback on mouse out', () =>
    {
        const onMouseOutSpy = jest.fn();
        wrapper.setProps( {
            onMouseOut : onMouseOutSpy
        } );

        wrapper.driver().mouseOut();

        expect( onMouseOutSpy ).toBeCalled();
    } );

    test( 'driver method `getLabel` should return the component label', () =>
    {
        wrapper = mount( <NavItem
            label = { <span>testLabel</span> }
        /> );

        const label = wrapper.driver().getLabel();

        expect( label.html() ).toBe( '<span>testLabel</span>' );
    } );
} );
