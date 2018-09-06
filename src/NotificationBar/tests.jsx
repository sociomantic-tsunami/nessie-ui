/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global test */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React            from 'react';
import { mount }        from 'enzyme';

import NotificationBar  from './index';

describe( 'NotificationBar', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <NotificationBar /> );
    } );

    test( 'should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );
} );


describe( 'NotificationBarDriver', () =>
{
    let wrapper;
    let driver;

    beforeEach( () =>
    {
        wrapper = mount( <NotificationBar /> );
        driver = wrapper.driver();
    } );


    describe( 'clickClose()', () =>
    {
        test( 'should trigger onClickClose callback once', () =>
        {
            const onClickClose = jest.fn();
            wrapper.setProps( { onClickClose } );

            driver.clickClose();
            expect( onClickClose ).toBeCalledTimes( 1 );
        } );

        test( 'should throw expected error if isDismissible: false', () =>
        {
            const error = 'NotificationBar is not dismissible';
            wrapper.setProps( { isDismissible: false } );

            expect( () => driver.clickClose() ).toThrowError( error );
        } );
    } );
} );
