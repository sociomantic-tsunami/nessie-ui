/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React        from 'react';
import { mount }    from 'enzyme';

import { Tooltip }  from '..';

describe( 'TooltipDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <Tooltip /> );
        driver  = wrapper.driver();
    } );

    describe( 'mouseOver()', () =>
    {
        test( 'should fire onMouseOver event', () =>
        {
            const onMouseOver = jest.fn();
            wrapper.setProps( {
                message : 'Tekeli-li!',
                onMouseOver,
            } );

            driver.mouseOver();
            expect( onMouseOver ).toBeCalledTimes( 1 );
        } );
    } );


    describe( 'mouseOut()', () =>
    {
        test( 'should fire onMouseOut event', () =>
        {
            const onMouseOut = jest.fn();
            wrapper.setProps( {
                message : 'Tekeli-li!',
                onMouseOut,
            } );

            driver.mouseOut();
            expect( onMouseOut ).toBeCalledTimes( 1 );
        } );
    } );

    describe( 'clickClose()', () =>
    {
        test( 'should trigger onClickClose callback prop once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( {
                onClickClose,
                message       : 'Sithis',
                isDismissible : true,
            } );

            driver.clickClose();
            expect( onClickClose ).toBeCalledTimes( 1 );
        } );

        test( 'should throw an expected error when is not dismissable', () =>
        {
            const expectedError = 'Tooltip cannot simulate clickClose since \
it is not dismissable';
            wrapper.setProps( {
                message : 'Sithis',
            } );

            expect( () => driver.clickClose() ).toThrow( expectedError );
        } );
    } );
} );
