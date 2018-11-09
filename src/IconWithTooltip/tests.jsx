/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-unused-expressions */

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
    } );
} );
