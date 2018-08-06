/* global test jest */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import Switch               from './index';

describe( 'Switch', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <Switch /> );
        instance = wrapper.instance();
    } );

    test( 'should pass isDisabled to <input> as “disabled”', () =>
    {
        wrapper.setProps( { isDisabled: true } );
        const input = wrapper.find( `.${instance.props.cssMap.input}` );

        expect( input.prop( 'disabled' ) ).toBeTruthy();
    } );
} );

describe( 'SwitchDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Switch /> );
        driver  = wrapper.driver();
    } );

    describe( 'change()', () =>
    {
        test( 'should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            driver.change();

            expect( onChange ).toBeCalledTimes( 1 );
        } );

        test( 'should toggle target.checked', () =>
        {
            let targetChecked;
            const onChange = jest.fn().mockImplementation( e =>
                targetChecked = e.target.checked );
            wrapper.setProps( { isChecked: true, onChange } );

            driver.toggle();

            expect( targetChecked ).toBeFalsy();
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback function', () =>
        {
            const onMouseOut = jest.fn();

            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();

            expect( onMouseOut ).toBeCalled();
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback function', () =>
        {
            const onMouseOver = jest.fn();

            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();

            expect( onMouseOver ).toBeCalled();
        } );
    } );

    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback function', () =>
        {
            const onBlur = jest.fn();

            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();

            expect( onBlur ).toBeCalled();
        } );
    } );

    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback function', () =>
        {
            const onFocus = jest.fn();

            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();

            expect( onFocus ).toBeCalled();
        } );
    } );
} );
