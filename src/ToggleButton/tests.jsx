/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global jest, test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React               from 'react';
import { shallow, mount }  from 'enzyme';

import { Icon }            from '../index';

import ToggleButton        from './index';


describe( 'ToggleButton', () =>
{
    let instance;
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <ToggleButton /> );
        instance = wrapper.instance();
    } );

    test( '<button> should always have type "button"', () =>
    {
        expect( wrapper.find( 'button' ).prop( 'type' ) ).toEqual( 'button' );
    } );

    test( 'should contain an Icon when iconType is not "none"', () =>
    {
        wrapper.setProps( { iconType: 'add' } );
        expect( wrapper.find( Icon ) ).toHaveLength( 1 );
    } );

    describe( 'Icon', () =>
    {
        test( 'should always have size "M"', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ).first().prop( 'size' ) )
                .toEqual( 'S' );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'label', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.label ).toBeUndefined();
            } );
        } );

        describe( 'role', () =>
        {
            test( 'should be "primary" by default', () =>
            {
                expect( instance.props.role ).toEqual( 'primary' );
            } );
        } );

        describe( 'id', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.id ).toBeUndefined();
            } );
        } );

        describe( 'iconPosition', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( instance.props.iconPosition ).toEqual( 'left' );
            } );
        } );

        describe( 'isDisabled', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isDisabled ).toEqual( false );
            } );

            test( 'should be passed to <button> as "disabled" when true', () =>
            {
                wrapper.setProps( { isDisabled: true } );
                expect( wrapper.prop( 'disabled' ) ).toEqual( true );
            } );
        } );

        describe( 'isReadOnly', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( instance.props.isReadOnly ).toEqual( false );
            } );

            test( 'should be passed to <button> as "readOnly" when true', () =>
            {
                wrapper.setProps( { isReadOnly: true } );
                expect( wrapper.prop( 'readOnly' ) ).toEqual( true );
            } );
        } );

        describe( 'onClick', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onClick ).toBeUndefined();
            } );

            test( 'should be passed to the <button> element', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick } );
                expect( wrapper.prop( 'onClick' ) ).toEqual( onClick );
            } );
        } );

        describe( 'onFocus', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onFocus ).toBeUndefined();
            } );

            test( 'should be passed to the <button>', () =>
            {
                const onFocus = jest.fn();
                wrapper.setProps( { onFocus } );
                expect( wrapper.prop( 'onFocus' ) ).toEqual( onFocus );
            } );
        } );

        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).toBeUndefined();
            } );

            test( 'should be passed to the <button> as onMouseEnter', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver } );
                expect( wrapper.prop( 'onMouseEnter' ) ).toEqual( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).toBeUndefined();
            } );

            test( 'should be passed to the <button> as onMouseLeave', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut } );
                expect( wrapper.prop( 'onMouseLeave' ) ).toEqual( onMouseOut );
            } );
        } );
    } );
} );


describe( 'ToggleButtonDriver', () =>
{
    let wrapper;
    let driver;
    let button;

    beforeEach( () =>
    {
        wrapper  = mount( <ToggleButton /> );
        driver   = wrapper.driver();
        button   = wrapper.find( 'button' ).first();
    } );

    describe( 'constructor', () =>
    {
        test( 'assigns the <button> to this.button', () =>
        {
            expect( driver.button.getNode() ).toEqual( button.getNode() );
        } );
    } );

    describe( 'click', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( { onClick } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'ToggleButton \'Cthulhu\' cannot \
simulate click since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Cthulhu' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( { onClick, isDisabled: true } );

                try
                {
                    driver.click();
                }
                catch ( error )
                {
                    expect( onClick ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver callback prop once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'ToggleButton \'Tekeli-li\' cannot \
simulate mouseOver since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver, isDisabled: true } );

                try
                {
                    driver.mouseOver();
                }
                catch ( error )
                {
                    expect( onMouseOver ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should trigger onMouseOut callback prop once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'ToggleButton \'Tekeli-li\' cannot \
simulate mouseOut since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( { onMouseOut, isDisabled: true } );

                try
                {
                    driver.mouseOut();
                }
                catch ( error )
                {
                    expect( onMouseOut ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'blur()', () =>
    {
        test( 'should trigger onBlur callback prop once', () =>
        {
            const onBlur = jest.fn();
            wrapper.setProps( { onBlur } );

            driver.blur();
            expect( onBlur ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'focus()', () =>
    {
        test( 'should trigger onFocus callback prop once', () =>
        {
            const onFocus = jest.fn();
            wrapper.setProps( { onFocus } );

            driver.focus();
            expect( onFocus ).toBeCalledTimes( 1 );
        } );
    } );
} );
