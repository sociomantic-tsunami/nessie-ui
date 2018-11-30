/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test jest */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import { Tooltip }  from '../index';
import styles       from './tooltip.css';


describe( 'Tooltip', () =>
{
    /* someone please implement me... */
} );


describe( 'TooltipDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Tooltip cssMap = { styles } /> );
    } );

    describe( 'mouseOver()', () =>
    {
        let onMouseOverHandler;
        let onMouseOutHandler;

        beforeEach( () =>
        {
            onMouseOverHandler = jest.fn();
            onMouseOutHandler = jest.fn();

            wrapper.setProps( {
                onMouseOver : onMouseOverHandler,
                onMouseOut  : onMouseOutHandler,
            } );

            wrapper.driver().mouseOver();
        } );

        test( 'should invoke onMouseOver callback', () =>
        {
            expect( onMouseOverHandler ).toBeCalled();
        } );

        test( 'should not invoke onMouseOut callback', () =>
        {
            expect( onMouseOutHandler ).not.toBeCalled();
        } );
    } );

    describe( 'mouseOut()', () =>
    {
        let onMouseOverHandler;
        let onMouseOutHandler;

        beforeEach( () =>
        {
            onMouseOverHandler = jest.fn();
            onMouseOutHandler = jest.fn();

            wrapper.setProps( {
                onMouseOver : onMouseOverHandler,
                onMouseOut  : onMouseOutHandler,
            } );

            wrapper.driver().mouseOut();
        } );

        test( 'should invoke onMouseOut callback', () =>
        {
            expect( onMouseOutHandler ).toBeCalled();
        } );

        test( 'should not invoke onMouseOver callback', () =>
        {
            expect( onMouseOverHandler ).not.toBeCalled();
        } );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return the wrapped content', () =>
        {
            wrapper.setProps( {
                children : 'Who am I?',
                message  : 'Pikachu!',
            } );

            const content = wrapper.driver().getContent();
            expect( content.text() ).toEqual( 'Who am I?' );
        } );
    } );

    describe( 'getMessage()', () =>
    {
        test( 'should return the tooltip message', () =>
        {
            wrapper.setProps( {
                children : 'Who am I?',
                message  : 'Pikachu!',
            } );

            const content = wrapper.driver().getMessage();
            expect( content.text() ).toEqual( 'Pikachu!' );
        } );
    } );
} );
