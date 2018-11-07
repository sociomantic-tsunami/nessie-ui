/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */
/* global jest test */

import React                   from 'react';
import { ReactWrapper, mount } from 'enzyme';

import { Checkbox }            from '../index';

import CheckableGroup          from './index';

describe( 'CheckableGroupDriver', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <CheckableGroup /> );
    } );

    describe( 'getContent()', () =>
    {
        test( 'should return all child nodes', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );
            expect( wrapper.driver().getContent() ).toHaveLength( 2 );
        } );

        test( 'should return an array of ReactWrappers', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" />,
                    <Checkbox label = "two" />
                ],
            } );

            wrapper.driver().getContent().forEach( item =>
                expect( item ).toBeInstanceOf( ReactWrapper ) );
        } );
    } );

    describe( 'getSelectedValues()', () =>
    {
        test( 'should return an array of selected values', () =>
        {
            wrapper.setProps( {
                children : [
                    <Checkbox label = "one" value = "first check" isChecked />,
                    <Checkbox label = "two" value = "second check" />
                ],
            } );

            expect( wrapper.driver().getSelectedValues() )
                .toEqual( [ 'first check' ] );
        } );
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should call onMouseOver exactly once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { onMouseOver } );

            wrapper.driver().mouseOver();

            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should call onMouseOut exactly once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { onMouseOut } );

            wrapper.driver().mouseOut();

            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );
} );
