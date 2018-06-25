/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React              from 'react';
import { mount, shallow } from 'enzyme';

import Icon               from './index';


describe( 'Icon', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Icon /> );
        instance = wrapper.instance();
    } );

    test( 'should have size S by default', () =>
    {
        expect( instance.props.size ).toBe( 'S' );
    } );

    test( 'should have light theme by default', () =>
    {
        expect( instance.props.theme ).toBe( 'light' );
    } );
} );


describe( 'IconDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Icon /> );
    } );

    test( 'should fire onMouseOver event', () =>
    {
        const onMouseOver = jest.fn();
        const onMouseOut = jest.fn();
        wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

        wrapper.driver().mouseOver();

        expect( onMouseOver ).toBeCalled();
        expect( onMouseOut ).not.toBeCalled();
    } );

    test( 'should fire onMouseOver event', () =>
    {
        const onMouseOver = jest.fn();
        const onMouseOut = jest.fn();
        wrapper.setProps( { type: 'alert', onMouseOver, onMouseOut } );

        wrapper.driver().mouseOut();

        expect( onMouseOut ).toBeCalled();
        expect( onMouseOver ).not.toBeCalled();
    } );
} );
