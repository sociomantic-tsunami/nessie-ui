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

import React       from 'react';
import { shallow } from 'enzyme';

import Icon        from './index';


describe( 'Icon', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = shallow( <Icon /> );
    } );

    test( 'should be a stateless functional component', () =>
    {
        expect( wrapper.instance() ).toBe( null );
    } );

describe( 'IconDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Icon /> );
        driver  = wrapper.driver();
    } );


    describe( 'mouseOver()', () =>
    {
        test( 'should trigger onMouseOver event once', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( { type: 'alert', onMouseOver } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Icon cannot simulate mouseOver because it is disabled';
                wrapper.setProps( { isDisabled: true } );

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
        test( 'should trigger onMouseOver event once', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( { type: 'alert', onMouseOut } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );


        describe( 'isDisabled', () =>
        {
            test( 'throws the expected error when isDisabled', () =>
            {
                const expectedError =
                    'Icon cannot simulate mouseOut because it is disabled';
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
} );
