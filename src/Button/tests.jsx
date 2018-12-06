/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                        from 'react';
import { mount, shallow }           from 'enzyme';

import { Button, Icon, Spinner }    from '../index';


describe( 'Button', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = shallow( <Button /> );
    } );

    test( 'should a stateless functional component', () =>
    {
        expect( wrapper.instance() ).toBe( null );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one <button>', () =>
        {
            expect( wrapper.find( 'button' ) ).toHaveLength( 1 );
        } );

        test( 'should have a exactly one Icon when configured', () =>
        {
            wrapper.setProps( { iconType: 'add' } );
            expect( wrapper.find( Icon ) ).toHaveLength( 1 );
        } );

        test( 'should have a exactly one Spinner when loading', () =>
        {
            wrapper.setProps( { isLoading: true } );
            expect( wrapper.find( Spinner ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'iconType', () =>
        {
            test( 'should be "none" by default', () =>
            {
                expect( Button.defaultProps.iconType ).toBe( 'none' );
            } );

            test( 'should be passed to the Icon as type', () =>
            {
                wrapper.setProps( { iconType: 'add' } );

                expect( wrapper.find( Icon ).prop( 'type' ) ).toBe( 'add' );
            } );
        } );

        describe( 'iconPosition', () =>
        {
            test( 'should be "left" by default', () =>
            {
                expect( Button.defaultProps.iconPosition ).toBe( 'left' );
            } );
        } );

        describe( 'role', () =>
        {
            test( 'should be "default" by default', () =>
            {
                expect( Button.defaultProps.role ).toBe( 'default' );
            } );
        } );

        describe( 'isLoading', () =>
        {
            test( 'should be false by default', () =>
            {
                expect( Button.defaultProps.isLoading ).toBe( false );
            } );
        } );

        describe( 'buttonRef', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( Button.defaultProps.buttonRef ).toBeUndefined();
            } );
        } );
    } );
} );


describe( 'ButtonDriver', () =>
{
    let wrapper;
    let driver;
    let button;

    beforeEach( () =>
    {
        wrapper  = mount( <Button /> );
        driver   = wrapper.driver();
        button   = wrapper.find( 'button' ).first();
    } );

    describe( 'constructor', () =>
    {
        test( 'assigns the <button> to this.button', () =>
        {
            expect( driver.button.instance() ).toEqual( button.instance() );
        } );
    } );

    describe( 'click()', () =>
    {
        test( 'should trigger onClick callback prop once', () =>
        {
            const onClick = jest.fn();
            wrapper.setProps( {
                onClick,
                label : 'Pikaboo',
            } );

            driver.click();
            expect( onClick ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'Button \'Pikaboo\' cannot simulate \
click since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Pikaboo' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isDisabled', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isDisabled : true,
                    label      : 'Pikaboo',
                } );

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


        describe( 'isReadOnly', () =>
        {
            test( 'throws the expected error when isReadOnly', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
click since it is read only';
                wrapper.setProps( { isReadOnly: true, label: 'Tekeli-li' } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isReadOnly', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isReadOnly : true,
                    label      : 'Tekeli-li',
                } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Pikaboo\' cannot simulate \
click since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Pikaboo'  } );

                expect( () => driver.click() ).toThrow( expectedError );
            } );

            test( 'should not trigger onClick when isLoading', () =>
            {
                const onClick = jest.fn();
                wrapper.setProps( {
                    onClick,
                    isLoading : true,
                    label     : 'Pikaboo',
                } );

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
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
mouseOver since it is disabled';
                wrapper.setProps( { isDisabled: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isDisabled', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    onMouseOver,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
mouseOver since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOver when isLoading', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( {
                    onMouseOver,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

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
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
mouseOut since it is disabled';

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isDisabled', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isDisabled : true,
                    label      : 'Tekeli-li',
                } );

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


        describe( 'isLoading', () =>
        {
            test( 'throws the expected error when isLoading', () =>
            {
                const expectedError = 'Button \'Tekeli-li\' cannot simulate \
mouseOut since it is loading';
                wrapper.setProps( { isLoading: true, label: 'Tekeli-li' } );

                expect( () => driver.mouseOut() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOut when isLoading', () =>
            {
                const onMouseOut = jest.fn();
                wrapper.setProps( {
                    onMouseOut,
                    isLoading : true,
                    label     : 'Tekeli-li',
                } );

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
} );
