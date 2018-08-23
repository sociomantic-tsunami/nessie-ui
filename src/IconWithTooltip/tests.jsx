/* eslint-disable no-magic-numbers */

import React                from 'react';
import { mount, shallow }   from 'enzyme';

import { Tooltip }          from '../index';

import IconWithTooltip      from './index';


describe( 'IconWithTooltip', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper  = shallow( <IconWithTooltip /> );
        instance = wrapper.instance();
    } );

    describe( 'props', () =>
    {
        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOver ).toBeUndefined();
            } );

            test(
                'should be be passed to the wrapper div as onMouseEnter',
                () =>
                {
                    const onMouseOver = jest.fn();
                    wrapper.setProps( { onMouseOver } );

                    expect( wrapper.find( 'div' ).first()
                        .prop( 'onMouseEnter' ) ).toBe( onMouseOver );
                },
            );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOut ).toBeUndefined();
            } );

            test(
                'should be be passed to the wrapper div as onMouseLeave',
                () =>
                {
                    const onMouseOut = jest.fn();
                    wrapper.setProps( { onMouseOut } );

                    expect( wrapper.find( 'div' ).first()
                        .prop( 'onMouseLeave' ) ).toBe( onMouseOut );
                },
            );
        } );

        describe( 'onMouseOverIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOverIcon ).toBeUndefined();
            } );

            test( 'should be be passed to the Tooltip as onMouseOver', () =>
            {
                const onMouseOverIcon = jest.fn();
                wrapper.setProps( { onMouseOverIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOver' ) )
                    .toBe( onMouseOverIcon );
            } );
        } );

        describe( 'onMouseOutIcon', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( instance.props.onMouseOutIcon ).toBeUndefined();
            } );

            test( 'should be be passed to the Tooltip as onMouseOut', () =>
            {
                const onMouseOutIcon = jest.fn();
                wrapper.setProps( { onMouseOutIcon } );

                expect( wrapper.find( Tooltip ).first().prop( 'onMouseOut' ) )
                    .toBe( onMouseOutIcon );
            } );
        } );
    } );
} );


describe( 'IconWithTooltipDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <IconWithTooltip /> );
        driver  = wrapper.driver();
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver prop exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { message: 'Tekeli-li!', onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'IconWithTooltip cannot simulate \
mouseOver because it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOver() ).toThrow( expectedError );
            } );

            test( 'shoud not trigger onMouseOver when isDisabled', () =>
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
        test( 'should call onMouseOut prop exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { message: 'Tekeli-li!', onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'IconWithTooltip cannot simulate \
mouseOut because it is disabled';
                wrapper.setProps( { isDisabled: true } );

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


    describe( 'mouseOverIcon()', () =>
    {
        test( 'should call onMouseOverIcon prop exactly once', () =>
        {
            const onMouseOverIcon = jest.fn();
            wrapper.setProps( { message: 'Tekeli-li!', onMouseOverIcon } );

            driver.mouseOverIcon();
            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'IconWithTooltip cannot simulate \
mouseOverIcon because it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOverIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOverIcon when isDisabled', () =>
            {
                const onMouseOverIcon = jest.fn();
                wrapper.setProps( { onMouseOverIcon, isDisabled: true } );

                try
                {
                    driver.mouseOverIcon();
                }
                catch ( error )
                {
                    expect( onMouseOverIcon ).not.toBeCalled();
                }
            } );
        } );
    } );


    describe( 'mouseOutIcon()', () =>
    {
        test( 'should call onMouseOutIcon prop exactly once', () =>
        {
            const onMouseOutIcon = jest.fn();
            wrapper.setProps( { message: 'Tekeli-li!', onMouseOutIcon } );

            driver.mouseOutIcon();
            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError = 'IconWithTooltip cannot simulate \
mouseOutIcon because it is disabled';
                wrapper.setProps( { isDisabled: true } );

                expect( () => driver.mouseOutIcon() ).toThrow( expectedError );
            } );

            test( 'should not trigger onMouseOutIcon when isDisabled', () =>
            {
                const onMouseOutIcon = jest.fn();
                wrapper.setProps( { onMouseOutIcon, isDisabled: true } );

                try
                {
                    driver.mouseOutIcon();
                }
                catch ( error )
                {
                    expect( onMouseOutIcon ).not.toBeCalled();
                }
            } );
        } );
    } );
} );
