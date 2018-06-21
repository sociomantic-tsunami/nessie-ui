/* eslint-env node, mocha */
/* global expect */
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

    beforeEach(() =>
    {
        wrapper = shallow( <Switch /> );
    });

    test('should pass isDisabled to <input> as “disabled”', () =>
    {
        wrapper.setProps( { isDisabled: true } );

        const input = wrapper.find( `.${wrapper.props().cssMap.input}` );

        expect( input.prop( 'disabled' ) ).toBe(true);
    });
} );

describe( 'SwitchDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <Switch /> );
    });

    describe( 'toggle()', () =>
    {
        test('should call onChange once', () =>
        {
            const onChange = jest.fn();
            wrapper.setProps( { onChange } );

            wrapper.driver().toggle();

            expect( onChange.calledOnce ).toBe(true);
        });

        test('should toggle target.checked', () =>
        {
            let targetChecked;
            const onChange = sinon.stub().callsFake( e =>
                targetChecked = e.target.checked
            );
            wrapper.setProps( { isChecked: true, onChange } );

            wrapper.driver().toggle();

            expect( targetChecked ).toBe(false);
        });
    } );

    describe( 'mouseOut', () =>
    {
        test('should trigger onMouseOut callback function', () =>
        {
            const onMouseOut = jest.fn();

            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut.calledOnce ).toBe(true);
        });
    } );

    describe( 'mouseOver', () =>
    {
        test('should trigger onMouseOver callback function', () =>
        {
            const onMouseOver = jest.fn();

            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver.calledOnce ).toBe(true);
        });
    } );

    describe( 'blur', () =>
    {
        test('should trigger onBlur callback function', () =>
        {
            const onBlur = jest.fn();

            wrapper.setProps( { onBlur } );

            wrapper.driver().blur();

            expect( onBlur.calledOnce ).toBe(true);
        });
    } );

    describe( 'focus', () =>
    {
        test('should trigger onFocus callback function', () =>
        {
            const onFocus = jest.fn();

            wrapper.setProps( { onFocus } );

            wrapper.driver().focus();

            expect( onFocus.calledOnce ).toBe(true);
        });
    } );
} );
