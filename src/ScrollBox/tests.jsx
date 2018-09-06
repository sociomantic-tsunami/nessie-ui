/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str */

import React      from 'react';
import { mount }  from 'enzyme';

import ScrollBar  from '../ScrollBar';
import * as utils from './utils';

import ScrollBox  from './index';


describe( 'ScrollBox', () =>
{
    let wrapper;
    let instance;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBox /> );
        instance = wrapper.instance();
    } );

    test( 'should have exactly one ScrollBar when scroll is "horizontal"', () =>
    {
        wrapper.setProps( { scroll: 'horizontal' } );
        wrapper.setState( {
            clientHeight : 100,
            scrollHeight : 200,
            clientWidth  : 100,
            scrollWidth  : 200,
        } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly one ScrollBar when scroll is "vertical"', () =>
    {
        wrapper.setProps( { scroll: 'vertical' } );
        wrapper.setState( {
            clientHeight : 100,
            scrollHeight : 200,
            clientWidth  : 100,
            scrollWidth  : 200,
        } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 1 );
    } );

    test( 'should have exactly two ScrollBars when scroll is "both"', () =>
    {
        wrapper.setProps( { scroll: 'both' } );
        wrapper.setState( {
            clientHeight : 100,
            scrollHeight : 200,
            clientWidth  : 100,
            scrollWidth  : 200,
        } );

        expect( wrapper.find( ScrollBar ) ).toHaveLength( 2 );
    } );

    test( 'thumbSize should be set on the scrollBars', () =>
    {
        wrapper.setProps( { scroll: 'both' } );
        wrapper.setState( {
            clientHeight : 100,
            scrollHeight : 200,
            clientWidth  : 100,
            scrollWidth  : 200,
        } );

        expect( wrapper.find( ScrollBar ).first().prop( 'thumbSize' ) )
            .toBe( '50%' );

        expect( wrapper.find( ScrollBar ).last().prop( 'thumbSize' ) )
            .toBe( '50%' );
    } );

    describe( 'handleScroll', () =>
    {
        let scrollHandler;

        test( 'forces component to update', () =>
        {
            jest.spyOn( instance, 'forceUpdate' );
            instance.handleScroll();
            expect( instance.forceUpdate ).toBeCalledTimes( 1 );
        } );

        test( 'calls createScrollHandler if onScroll prop is defined', () =>
        {
            scrollHandler = jest.fn();
            jest.spyOn( utils, 'createScrollHandler' )
                .mockImplementation( () => scrollHandler );

            wrapper.setProps( { onScroll: jest.fn() } );
            instance.handleScroll();
            expect( utils.createScrollHandler ).toBeCalledTimes( 1 );
        } );

        test( '...then calls the resulting function', () =>
        {
            expect( scrollHandler ).toBeCalledTimes( 1 );
            utils.createScrollHandler.mockRestore();
        } );
    } );
} );


describe( 'ScrollBoxDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <ScrollBox /> );
    } );

    describe( 'clickScrollX', () =>
    {
        test( 'invokes onClickScrollUp callback prop', () =>
        {
            const onClickScrollUp = jest.fn();
            wrapper.setProps( { onClickScrollUp, scrollUpIsVisible: true } );

            wrapper.driver().clickScrollUp();

            expect( onClickScrollUp ).toBeCalledTimes( 1 );
        } );

        test( 'invokes onClickScrollRight callback prop', () =>
        {
            const onClickScrollRight = jest.fn();
            wrapper.setProps( {
                onClickScrollRight,
                scrollRightIsVisible : true,
            } );

            wrapper.driver().clickScrollRight();

            expect( onClickScrollRight ).toBeCalledTimes( 1 );
        } );


        test( 'invokes onClickScrollDown callback prop', () =>
        {
            const onClickScrollDown = jest.fn();
            wrapper.setProps( {
                onClickScrollDown,
                scrollDownIsVisible : true,
            } );

            wrapper.driver().clickScrollDown();

            expect( onClickScrollDown ).toBeCalledTimes( 1 );
        } );


        test( 'invokes onClickScrollLeft callback prop', () =>
        {
            const onClickScrollLeft = jest.fn();
            wrapper.setProps( {
                onClickScrollLeft,
                scrollLeftIsVisible : true,
            } );

            wrapper.driver().clickScrollLeft();

            expect( onClickScrollLeft ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'scrollVertical()', () =>
    {
        test( 'should trigger onScroll()', () =>
        {
            const onScroll = jest.fn();
            wrapper.setProps( { onScroll, scroll: 'vertical' } );

            wrapper.driver().scrollVertical( 250 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );

        test( 'should throw an error when scroll direction is wrong', () =>
        {
            const props = { scroll: 'horizontal' };

            wrapper = mount( <ScrollBox { ...props } /> );

            expect( () => wrapper.driver().scrollVertical( 10 ) )
                .toThrowError( 'Cannot scroll because scroll direction is \
neither \'vertical\' nor \'both\'' );
        } );
    } );

    describe( 'scrollHorizontal()', () =>
    {
        test( 'should trigger onScroll()', () =>
        {
            const onScroll = jest.fn();
            wrapper.setProps( { onScroll, scroll: 'horizontal' } );

            wrapper.driver().scrollHorizontal( 250 );

            expect( onScroll ).toBeCalledTimes( 1 );
        } );


        test( 'should throw an error when scroll direction is wrong', () =>
        {
            wrapper.setProps( { scroll: 'vertical' } );

            expect( () => wrapper.driver().scrollHorizontal( 270 ) )
                .toThrowError( 'Cannot scroll because scroll direction is \
neither \'horizontal\' nor \'both\'' );
        } );
    } );
} );
