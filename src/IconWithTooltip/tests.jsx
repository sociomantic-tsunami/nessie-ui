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

import React                            from 'react';
import { mount, shallow, ReactWrapper } from 'enzyme';

import { IconWithTooltip, Tooltip }     from '../index';
import styles                           from './iconWithTooltip.css';


describe( 'IconWithTooltip', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <IconWithTooltip cssMap = { styles } /> );
    } );

    describe( 'props', () =>
    {
        describe( 'onMouseOver', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( IconWithTooltip.defaultProps.onMouseOver )
                    .toBeUndefined();
            } );

            test( 'should be be passed to wrapper div as onMouseEnter', () =>
            {
                const onMouseOver = jest.fn();
                wrapper.setProps( { onMouseOver } );

                expect( wrapper.find( 'div' ).first()
                    .prop( 'onMouseEnter' ) ).toBe( onMouseOver );
            } );
        } );

        describe( 'onMouseOut', () =>
        {
            test( 'should be undefined by default', () =>
            {
                expect( IconWithTooltip.defaultProps.onMouseOut )
                    .toBeUndefined();
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
                expect( IconWithTooltip.defaultProps.onMouseOverIcon )
                    .toBeUndefined();
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
                expect( IconWithTooltip.defaultProps.onMouseOutIcon )
                    .toBeUndefined();
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

    beforeEach( () =>
    {
        wrapper = mount( <IconWithTooltip cssMap = { styles } /> );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver prop exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut prop exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOverIcon()', () =>
    {
        test( 'should call onMouseOverIcon prop exactly once', () =>
        {
            const onMouseOverIcon = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOverIcon } );

            wrapper.driver().mouseOverIcon();

            expect( onMouseOverIcon ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'mouseOutIcon()', () =>
    {
        test( 'should call onMouseOutIcon prop exactly once', () =>
        {
            const onMouseOutIcon = jest.fn();
            wrapper.setProps( { message: 'Pikachu!', onMouseOutIcon } );

            wrapper.driver().mouseOutIcon();

            expect( onMouseOutIcon ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return a Reactwrapper', () =>
        {
            expect( wrapper.driver().getContent() )
                .toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the wrapped content', () =>
        {
            wrapper.setProps( {
                message  : 'Pikachu!',
                children : <h1>Who am i?</h1>,
            } );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h1' ) ).toHaveLength( 1 );
        } );
    } );

    describe( 'getMessage()', () =>
    {
        test( 'should return a Reactwrapper', () =>
        {
            expect( wrapper.driver().getMessage() )
                .toBeInstanceOf( ReactWrapper );
        } );

        test( 'should contain the Tooltip message', () =>
        {
            wrapper.setProps( {
                message          : <h2>Pikachu!</h2>,
                tooltipIsVisible : true,
            } );

            const message = wrapper.driver().getMessage();
            expect( message.find( 'h2' ) ).toHaveLength( 1 );
        } );
    } );
} );
